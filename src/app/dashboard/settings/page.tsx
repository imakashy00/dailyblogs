"use client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/books.png";
export default function page() {
  // const { data: session } = useSession();
  // const username = session?.user?.username || "";
  return (
    <div className=" w-full sm:p-10">
      <div className="sm:hidden flex justify-between px-5 py-3 bg-white w-full border-b  ">
        <Link href={"/dashboard"}>
          <div className="flex justify-around sm:mb-20  px-5 ">
            <Image className="w-8 h-8" src={logo} alt="logo" />
          </div>
        </Link>
        <h1 className="pt-1 text-lg">Settings</h1>
      </div>
      <div className="sm:p-auto p-10">
        {/* <div>edit profile</div> */}
        <div>download journal</div>
        <div>No of subscription days left...</div>
        <div>get subscription</div>
        <div>cancel subscription</div>
        <Button
          className="w-1/2  bg-white hover:bg-red-200 text-red-600 flex "
          onClick={() => signOut()}
        >
          <LogOut className="mr-4" />
          Signout
        </Button>
      </div>
    </div>
  );
}
