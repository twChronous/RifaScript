import { Html, Head, Main, NextScript } from "next/document";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Rifascript",
    icons: "https://github.com/edra-unb-fga.png",
    description: "Site para gerenciar a venda de rifas da EDRA",
  };

  export default function Document() {
  return (
    <Html lang="pt-br">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
