import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Note Keeper",
  description: "Create, read, update, delete, and search your notes.",
  applicationName: "Note Keeper",
  authors: [{ name: "Note Keeper" }],
  icons: [],
  keywords: ["notes", "notepad", "CRUD", "Next.js"],
  metadataBase: new URL("http://localhost"),
  themeColor: "#ffffff",
  other: {
    primary: "#1e293b",
    secondary: "#64748b",
    accent: "#fbbf24",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="text-primary bg-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
