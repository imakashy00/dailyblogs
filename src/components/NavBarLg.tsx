"use client";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import {
  BookmarkIcon,
  CircleUserRound,
  LogOut,
  SquarePen,
  Settings,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import logo from "../../public/books.png";
import Link from "next/link";
import { Button } from "./ui/button";
// get session from next-auth and get username from it

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const username = session?.user?.username || "";
  const links = [
    {
      name: "write",
      href: "/dashboard/write",
      icon: SquarePen,
    },
    {
      name: `${username}`,
      href: "/dashboard",
      icon: CircleUserRound,
    },
    {
      name: "tags",
      href: "/dashboard/tags",
      icon: BookmarkIcon,
    },
    {
      name: "settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  /* onclicking  the search field should send the query to backend to fetch data using axios and redirect the user to [journal]*/
  const onSubmit = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    console.log(e);
    // fetch data from backend
    // redirect to [journal]
  };

  return (
    <>
      <nav className="w-1/5 p-10 mr-5 bg-white shadow-lg sm:flex flex-col justify-between  rounded-xl fixed left-0 top-0 h-full">
        <div className="w-full h-auto">
          <Link href={"/dashboard"}>
            <div className="flex justify-around mb-20 px-5 ">
              <Image className="w-10 h-10" src={logo} alt="logo" />
              <span className="text-2xl flex items-center text-yellow-500">
                dailyblogs
              </span>
            </div>
          </Link>

          <ul className="flex flex-col py-5 text-gray-600">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.name} href={link.href}>
                  <li
                    className={`py-5 justify-start items-center space-x-5 rounded-xl transition flex px-5 my-3 ${
                      isActive(link.href)
                        ? "text-yellow-500 shadow-md   "
                        : "hover:shadow-md hover:text-yellow-500 "
                    }`}
                  >
                    <Icon />
                    <span>{link.name}</span>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        {/* <Button
          className="w-1/2 ml-2 bg-white hover:bg-red-200 text-red-600 flex "
          onClick={() => signOut()}
        >
          <LogOut className="mr-4" />
          Signout
        </Button> */}
      </nav>
    </>
  );
};

export default NavBar;
