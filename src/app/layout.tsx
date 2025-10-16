import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeProvider";

export const metadata: Metadata = {
  title: "Controle Financeiro | Gerencie suas finanças",
  description: "Sistema de controle financeiro pessoal com monitoramento semanal e mensal de receitas e despesas",
  keywords: "finanças, controle financeiro, despesas, receitas, orçamento",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
