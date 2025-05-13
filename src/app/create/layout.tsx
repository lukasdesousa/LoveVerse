// app/create/layout.tsx
import { ReactNode } from "react";
import Head from "next/head";
import Script from "next/script";

export default function CreateLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <link
          rel="preload"
          as="image"
          href="https://res.cloudinary.com/diidbde0o/image/upload/v1747155241/23a5ad20-c297-474b-ae95-ecf42791b1ca_hibbb4.png"
        />
      </Head>

      {/* JSON-LD para Structured Data */}
      <Script id="json-ld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Crie uma mensagem inesquecível",
          description:
            "Crie uma mensagem interativa e impressione o seu amor por apenas R$7,90",
          url: "https://www.loveverse.space/create",
          inLanguage: "pt-BR",
          publisher: {
            "@type": "Organization",
            name: "LoveVerse",
            url: "https://www.loveverse.space",
          },
        })}
      </Script>
      
      <main>{children}</main>
    </>
  );
}
