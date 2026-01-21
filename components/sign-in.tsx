"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@heroui/button";
export const LoginButton = () => {
  const { data: session } = useSession();

  return (
    <div className="flex justify-end">
      {session ? (
        <>
          <p className="p-2">Signed in as {session.user?.email}</p>
          <Button onPress={() => signOut()}>Sign out</Button>
        </>
      ) : (
        <Button onPress={() => signIn("google")}>Sign in with Google</Button>
      )}
    </div>
  );
};
