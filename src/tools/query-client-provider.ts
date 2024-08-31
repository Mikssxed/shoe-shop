import * as ReactQuery from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

const queryClient = new ReactQuery.QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 15 * 1000, // 15s
      gcTime: 30 * 60 * 1000, // 30min; garbage collection time
      // @ts-expect-error error: Error -> error: AxiosError
      retry: (failureCount, error: AxiosError) => {
        if (failureCount >= 3) {
          console.error("Failed to fetch data after 3 attempts", error.message);
          enqueueSnackbar("Failed to fetch data", { variant: "error" });
          return false;
        }
        if (
          error.response?.status &&
          (error.response?.status === 429 || error.response?.status >= 500)
        ) {
          return true;
        }
        console.error("Failed to fetch data", error.message);
        enqueueSnackbar("Failed to fetch data", { variant: "error" });
        return false;
      },
    },
  },
});

export default queryClient;
