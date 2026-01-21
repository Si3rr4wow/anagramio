"use client";

import { title } from "@/components/primitives";
import { useIsSignedIn } from "@/hooks/use-is-signed-in";
import { UploadForm } from "./form";

export default function UploadDictionary() {
  const isSignedIn = useIsSignedIn();

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <h1>
          <span className={title()}>Acronym</span>
          <span className={title({ color: "violet" })}>.io</span>
        </h1>

        <br />

        {isSignedIn ? <UploadForm /> : <p>Sign in to upload a dictionary</p>}
      </div>
    </section>
  );
}
