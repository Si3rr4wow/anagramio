"use server";

import { buildSortedWord } from "@/common";
import { getDbClient } from "@/db/client";

const isFile = (maybeFile: unknown): maybeFile is File => {
  return maybeFile instanceof File;
};

export const uploadDictionary = async (formData: FormData) => {
  const dictionary = formData.get("dictionary");

  if (!isFile(dictionary)) {
    // TODO handle this more gracefully
    throw new Error("The uploaded item was not a file");
  }

  // We could process a readable stream chunk by chunk
  // but this is probably fine for files sub 100mb
  // and only uploaded by an admin in a prod env
  const text = await dictionary.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    console.error("The file could not be parsed to JSON");
    throw new Error("Failed to parse dictionary");
  }

  console.log(`Dictionary contains ${Object.keys(data).length} words.`);

  const bulkOperations = Object.entries(data).reduce<
    {
      insertOne: {
        document: { word: string; definition: string; sortedWord: string };
      };
    }[]
  >((acc, [word, definition]) => {
    acc.push({
      insertOne: {
        document: {
          word,
          // TODO typecheck these in a validation step before this
          definition: definition as string,
          sortedWord: buildSortedWord(word),
        },
      },
    });
    return acc;
  }, []);

  const dbClient = await getDbClient();

  console.log("Writing words to database");
  await dbClient.getCollections().words.bulkWrite(bulkOperations);
  console.log("Creating index on word");
  await dbClient.getCollections().words.createIndex({ word: 1 });
  console.log("Creating index on sortedWord");
  await dbClient.getCollections().words.createIndex({ sortedWord: 1 });
};
