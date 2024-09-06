import NavBar from "@/components/NavBar";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
export const metadata: Metadata = {
  title: "Next.js",
};

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full bg-gray-100 h-screen justify-start ">
      {/* Include shared UI here e.g. a header or sidebar */}
      <div className="w-1/5 ">
        <NavBar />
      </div>
      <div className="w-3/5">{children}</div>
      <div className="w-1/5">
        <Sidebar />
      </div>
    </section>
  );
}
