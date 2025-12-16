import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

import "@/styles/globals.css";
import { Nunito_Sans } from "next/font/google";

const nunitoSans = Nunito_Sans({variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Cod Camo Tracker",
  description: "Track Call of Duty weapon camo challenges and progress.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={nunitoSans.variable}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>
          {children}
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
