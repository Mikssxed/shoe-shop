import { ILogInRequest, ILogInResponse, IReactQueryError } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const useSignIn = () => {
  const router = useRouter();
  return useMutation<ILogInResponse, IReactQueryError, ILogInRequest>({
    mutationFn: async (credentials: ILogInRequest) => {
      const result = await signIn("credentials", {
        redirect: false,
        ...credentials,
      });
      if (result?.error) {
        throw new Error(result.error);
      }
      return result || {};
    },
    onSuccess: () => router.push("/products"),
  });
};

export default useSignIn;
