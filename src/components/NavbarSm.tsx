"use client";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

import {
  BookmarkIcon,
  CircleUserRound,
  LogOut,
  SquarePen,
  Search,
  Settings,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import logo from "../../public/books.png";
import Link from "next/link";
import { Button } from "./ui/button";

const NavbarSm: React.FC = () => {
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
  return (
    <nav className="w-full bg-white flex border  fixed bottom-0">
      <ul className="flex justify-around text-gray-600  w-full">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.name} href={link.href}>
              <li
                className={`py-2 justify-start items-center space-x-5 rounded-xl transition flex px-5 my-3 ${
                  isActive(link.href)
                    ? "text-yellow-500    "
                    : " hover:text-yellow-500 "
                }`}
              >
                <Icon />
                {/* <span>{link.name}</span> */}
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavbarSm;
