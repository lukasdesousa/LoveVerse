import { Inter } from "next/font/google";
import ReduxProvider from "@/store/reduxProvider";
import { GlobalStyle } from "@/styles/GlobalStyle";
import ThemeInitializer from "@/components/ThemeInitializer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <body >
        <ReduxProvider>
          <ThemeInitializer />
            <GlobalStyle />       
            {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
