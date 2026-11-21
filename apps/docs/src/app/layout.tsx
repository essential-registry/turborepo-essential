import { cn } from "@repo/lib";

import "@/styles/root-layout.css";
import type { Metadata } from "next";

import { env } from "@/lib/env";
import { fonts } from "@/lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: "Turborepo Essential Docs",
    template: "%s | Turborepo Essential",
  },
  description: "Documentation site.",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(
        fonts.GeistSans.variable,
        fonts.GeistMono.variable,
        "font-sans"
      )}
    >
      <body>{children}</body>
    </html>
  );
}
