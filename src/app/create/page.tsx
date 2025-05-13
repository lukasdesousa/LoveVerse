import Create from "@/components/create-component/Create";
import { Metadata } from "next";


// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: "Crie uma mensagem",
  description:
    "Crie uma mensagem interativa e impressione o seu amor por apenas R$7,90",
  keywords: [
    "mensagens de amor",
    "cartas românticas",
    "frases para namorado",
    "personalizadas",
    "romantismo",
  ],
  alternates: {
    canonical: "https://www.loveverse.space/create",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  openGraph: {
    title: "Crie uma mensagem inesquecível",
    description:
      "Descubra a magia de expressar sentimentos com o LoveVerse. Crie mensagens personalizadas e surpreenda quem você ama.",
    url: "https://www.loveverse.space/create",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/diidbde0o/image/upload/v1747155241/23a5ad20-c297-474b-ae95-ecf42791b1ca_hibbb4.png",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Crie uma mensagem inesquecível",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crie uma mensagem",
    description:
      "Descubra a magia de expressar sentimentos com o LoveVerse. Crie mensagens personalizadas e surpreenda quem você ama.",
    images: ["https://res.cloudinary.com/diidbde0o/image/upload/v1747155241/23a5ad20-c297-474b-ae95-ecf42791b1ca_hibbb4.png"],
  },
};

function Index() {
  return (
    <Create />
  )
};

export default Index;