import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

export const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  // const { showToast } = useToast();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
        // Handle error globally only for useQuery to prevent multiple toast errors
        queryCache: new QueryCache({
          onError: (error) => {
            toast.error(error.message);
          },
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
