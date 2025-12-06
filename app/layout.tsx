import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HireAI - AI-Powered Hiring Platform",
  description:
    "Streamline your hiring process with AI-powered candidate ranking and management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="" suppressHydrationWarning>
      <body className={`font-sans antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
