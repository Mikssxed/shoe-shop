import { ILogInRequest, ILogInResponse, IReactQueryError } from "@/lib/types";
import axiosInstance from "@/tools/axios";
import { useMutation } from "@tanstack/react-query";
import { SignInResponse, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

const useSignIn = () => {
  const router = useRouter();
  return useMutation<ILogInResponse, IReactQueryError, ILogInRequest>({
    mutationFn: async (credentials: ILogInRequest) => {
      return axiosInstance.post(
        `${process.env.API_URL}/auth/local`,
        credentials
      );
    },
    onSuccess: (_, userData) => {
      signIn("credentials", {
        identifier: userData.identifier,
        password: userData.password,
        redirect: false,
      }).then((value: SignInResponse | undefined) => {
        if (value?.ok) {
          localStorage.setItem("signInJustNow", JSON.stringify(true));
          router.push("/products");
        } else {
          enqueueSnackbar("Something went wrong!", { variant: "error" });
        }
      });
    },
    onError: (e: any) => {
      const errorMessage =
        e.response!.data.error.message.replace("identifier", "email") ||
        "Wrong credentials";
      enqueueSnackbar(errorMessage, {
        variant: "error",
        autoHideDuration: 10000,
      });
    },
  });
};

export default useSignIn;
