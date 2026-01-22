"use client";

import { title } from "./primitives";
import { useIsSignedIn } from "@/hooks/use-is-signed-in";
import { Input } from "@heroui/input";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { getAnagrams } from "./actions";
import { ChangeEvent, useState } from "react";
import { Document } from "mongodb";
import { debounce } from "@/common";

export default function Home() {
  const isSignedIn = useIsSignedIn();
  const [anagrams, setAnagrams] = useState<Array<Document>>([]);
  const [selectedAnagram, setSelectedAnagram] = useState<Document | null>(null);

  const onWordChange = debounce<ChangeEvent<HTMLInputElement>>(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setSelectedAnagram(null);
      const nextAnagrams = await getAnagrams(event.target.value);
      setAnagrams(nextAnagrams);
    },
  );

  const onSelectionChange = (anagram: Document) => () => {
    setSelectedAnagram(anagram);
  };

  return (
    <div className="flex flex-row justify-center">
      <section className="flex justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <h1>
            <span className={title()}>Anagram</span>
            <span className={title({ color: "violet" })}>.io</span>
          </h1>

          <br />

          {isSignedIn ? (
            <Input label="Search word" name="word" onChange={onWordChange} />
          ) : (
            <p>Sign in to search for anagrams</p>
          )}

          <Listbox className="py-4" emptyContent="No anagrams">
            {anagrams.map((anagram) => {
              return (
                <ListboxItem
                  key={anagram.word}
                  onPress={onSelectionChange(anagram)}
                >
                  {anagram.word}
                </ListboxItem>
              );
            })}
          </Listbox>
        </div>
      </section>
      <section className="gap-4 p-8 md:py-10 w-100 h-100">
        <p id="definition">{selectedAnagram && selectedAnagram.definition}</p>
      </section>
    </div>
  );
}
