"use client";
import { usePathname } from "next/navigation";
import {
  BookmarkIcon,
  CircleUserRound,
  PenTool,
  Search,
  Settings,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import logo from "../../public/books.png";
import Link from "next/link";

const username = "imakashy00";
const links = [
  {
    name: "write",
    href: "/dashboard/write",
    icon: PenTool,
  },
  {
    name: "imakashy00",
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

const NavBar: React.FC = () => {
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
      <nav className="w-1/5 p-10 mr-5 bg-white shadow-lg rounded-xl fixed left-0 top-0 h-full">
        <Link href={"/dashboard"}>
          <div className="flex justify-around mb-20 px-5 ">
            <Image className="w-10 h-10" src={logo} alt="logo" />
            <span className="text-2xl flex items-center text-yellow-500">
              dailyblogs
            </span>
          </div>
        </Link>
        {/* an search input field from shadcn ui */}
        {/* onclicking  the search field should send the query to backend to fetch data using axios and redirect the user to [journal]*/}
        {/* <div className="mt-10 justify-start items-center space-x-3 rounded-xl transition flex">
          <div className="flex items-center border-2 rounded-xl focus-within:border-yellow-400 p-2 w-full ">
            <Search onClick={  onSubmit } className="text-gray-800 ml-4 size-6" size={20} />
            <input
              className="w-full pl-2 focus:outline-none text-gray-600"
              type="date"
              name="trip-start"
              // value="2018-07-22"
              min="2024-08-01"
              max="2025-09-31"
              placeholder="Search"
            />
          </div> */}
        {/* </div> */}
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
      </nav>
    </>
  );
};

export default NavBar;
