import NavBar from "@/components/NavBarLg";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import NavbarSm from "@/components/NavbarSm";
export const metadata: Metadata = {
  title: "Next.js",
};

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="sm:flex w-full bg-gray-100 h-screen sm:justify-start ">
      {/* Include shared UI here e.g. a header or sidebar */}
      <div className="sm:w-1/5 sm:block hidden">
        <NavBar />
      </div>
      <div className="sm:hidden  w-full border border-red-500">
        <NavbarSm />
      </div>
      <div className="sm:w-3/5 w-full">{children}</div>
      <div className="sm:w-1/5 sm:block hidden">
        <Sidebar />
      </div>
    </section>
  );
}
