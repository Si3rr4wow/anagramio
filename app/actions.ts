"use server";

import { buildSortedWord } from "@/common";
import { getDbClient } from "@/db/client";
import { Document } from "mongodb";

export const getAcronyms = async (word: string): Promise<Array<Document>> => {
  if (typeof word !== "string") throw new Error("Given word was not a string");
  if (word.length > 45) throw new Error("Given word was too long");
  const dbClient = await getDbClient();
  const docs = await dbClient
    .getCollections()
    .words.find({ sortedWord: buildSortedWord(word) })
    .toArray();

  // strip ids as they are not serialisable and we don't really need them client side
  // also while we're at it pop the searched for word out of the list since it's not an acronym of itself
  return docs.reduce<Document[]>((acc, { _id, ...doc }) => {
    if (doc.word === word) return acc;
    return [...acc, doc];
  }, []);
};
