import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AKASHA Downloader Pro",
  description: "Gestión Multimedia de Alto Rendimiento",
  manifest: "/manifest.json",
  themeColor: "#E67E22"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}