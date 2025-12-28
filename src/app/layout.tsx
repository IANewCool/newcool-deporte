import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deporte Chile - IND | NewCooltura Informada",
  description: "Recintos deportivos, programas IND, federaciones y calculadora de frecuencia cardiaca en Chile",
  keywords: ["deporte Chile", "IND", "recintos deportivos", "federaciones", "vida activa"],
  openGraph: {
    title: "Deporte Chile - NewCooltura Informada",
    description: "Programas IND y recintos deportivos",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
