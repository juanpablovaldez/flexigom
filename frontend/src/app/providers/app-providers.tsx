import type { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { QueryProvider } from "./query-provider";
import { Toaster } from "sonner";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <HelmetProvider>
      <QueryProvider>{children}</QueryProvider>
      <Toaster position="bottom-right" richColors closeButton />
    </HelmetProvider>
  );
}
