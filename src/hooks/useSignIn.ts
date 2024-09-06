import { signIn } from "next-auth/react";
import { ILogInRequest, ILogInResponse, IReactQueryError } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";

const useSignIn = () => {
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
  });
};

export default useSignIn;
