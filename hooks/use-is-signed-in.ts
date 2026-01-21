import { useSession } from "next-auth/react";

export const useIsSignedIn = () => {
  const { status } = useSession();

  return status === "authenticated";
};
