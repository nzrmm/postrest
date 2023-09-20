import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  preload: true,
  display: "swap",
  variable: "--font-space-grotesk",
});

export default function App({ Component, pageProps }: AppProps) {
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

      <Component {...pageProps} />
    </>
  );
}
