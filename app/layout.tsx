import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";

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
      <body
        className={`font-sans antialiased bg-background text-foreground flex min-h-screen w-full`}
      >
        <Sidebar />
        <main className="flex-1 w-full flex flex-col gap-1">
          <Navbar />
          <div className="p-6">{children}</div>
        </main>
      </body>
    </html>
  );
}
