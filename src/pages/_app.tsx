import "@/styles/globals.css";
import { useState } from "react";
import type { AppProps } from "next/app";
import { Space_Grotesk } from "next/font/google";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { MainLayout } from "@/layouts";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  preload: true,
  display: "swap",
  variable: "--font-space-grotesk",
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <style jsx global>{`
        :root {
          --font-space-grotesk: ${spaceGrotesk.style.fontFamily};
        }
        html {
          font-family: var(--font-space-grotesk);
        }
      `}</style>

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </Hydrate>
        <ReactQueryDevtools position="bottom-right" />
      </QueryClientProvider>
    </>
  );
}
