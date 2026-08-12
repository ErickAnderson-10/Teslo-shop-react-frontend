import { RouterProvider } from "react-router";
import { appRouter } from "./app.router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { Toaster } from "sonner";
import type { PropsWithChildren } from "react";
import { CustomFullScreenLoading } from "./components/custom/CustomFullScreenLoading";
import { useAuthStore } from "./auth/store/auth.store";

const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { checkAuthStatus } = useAuthStore();

  const { isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthStatus, //Así se une con el useAuthStore(Nuestro gestor de estado)
    retry: false,
    refetchInterval: 1000 * 6 * 1.5, //El token dura aproximadamente 2 horas, entonces cada hora y media quiero que se vuelva a disperar automaticamente esta peticion cada hora y media
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <CustomFullScreenLoading />;

  return children;
};
export const TesloShopApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <CheckAuthProvider>
        <RouterProvider router={appRouter} />
      </CheckAuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
