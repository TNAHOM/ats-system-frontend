import { Sidebar } from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 w-full flex flex-col gap-1">
        <Navbar />
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
