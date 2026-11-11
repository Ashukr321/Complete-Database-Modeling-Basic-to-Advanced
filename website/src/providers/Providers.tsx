"use client";

import { ThemeProvider } from "next-themes";
import QueryProvider from "./QueryProvider";
import ServiceWorker from "./ServiceWorker";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryProvider>{children}</QueryProvider>
      <ServiceWorker />
    </ThemeProvider>
  );
}
