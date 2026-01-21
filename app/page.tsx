"use client";

import { title } from "@/components/primitives";
import { useIsSignedIn } from "@/hooks/use-is-signed-in";
import { Input } from "@heroui/input";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { getAcronyms } from "./actions";
import { ChangeEvent, useState } from "react";
import { Document } from "mongodb";

export default function Home() {
  const isSignedIn = useIsSignedIn();
  const [acronyms, setAcronyms] = useState<Array<Document>>([]);
  const [selectedAcronym, setSelectedAcronym] = useState<Document | null>(null);

  const onWordChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedAcronym(null);
    const nextAcronyms = await getAcronyms(event.target.value);
    setAcronyms(nextAcronyms);
  };

  const onSelectionChange = (acronym: Document) => () => {
    setSelectedAcronym(acronym);
  };

  return (
    <div className="flex flex-row justify-center">
      <section className="flex justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <h1>
            <span className={title()}>Acronym</span>
            <span className={title({ color: "violet" })}>.io</span>
          </h1>

          <br />

          {isSignedIn ? (
            <Input label="Search word" name="word" onChange={onWordChange} />
          ) : (
            <p>Sign in to search for acronyms</p>
          )}

          <Listbox className="py-4" emptyContent="No acronyms">
            {acronyms.map((acronym) => {
              return (
                <ListboxItem
                  key={acronym.word}
                  onPress={onSelectionChange(acronym)}
                >
                  {acronym.word}
                </ListboxItem>
              );
            })}
          </Listbox>
        </div>
      </section>
      <section className="gap-4 p-8 md:py-10 w-100 h-100">
        <p>{selectedAcronym && selectedAcronym.definition}</p>
      </section>
    </div>
  );
}
