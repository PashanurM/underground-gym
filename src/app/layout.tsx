import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { ThemeColors } from "@/components/theme/ThemeColors";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${brand.name} | Premium Training`,
    template: `%s | ${brand.name}`,
  },
  description: brand.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Sofia+Sans+Condensed:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased atmosphere">
        <ThemeColors />
        {children}
      </body>
    </html>
  );
}
