import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { redirect } from "next/navigation";

//TODO: create middleware that will replace this hook
const useRedirectIfAuth = () => {
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      redirect("/products");
    }
  }, [status]);
};

export default useRedirectIfAuth;
