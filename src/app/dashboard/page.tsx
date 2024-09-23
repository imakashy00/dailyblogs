"use client";
import React, { use, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Calendar from "@/app/dashboard/Calender";
import Image from "next/image";
import logo from "../../../public/books.png"; // Adjust the path to your logo image
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  const username = session?.user?.username || "";
  const router = useRouter(); // Move the declaration of 'router' to the top
  const [currentStreak, setCurrentStreak] = React.useState(0);
  const [longestStreak, setLongestStreak] = React.useState(0);
  const [totalWords, setTotalWords] = React.useState(0);
  const searchParams = useSearchParams();
  useEffect(() => {
    async function fetchData() {
      // fetch data from backend of tags using axios
      const result = await axios.get("/api/dashboard");
      console.log(result.data);
      setCurrentStreak(result.data.currentStreak);
      setLongestStreak(result.data.longestStreak);
      setTotalWords(result.data.totalWords);
    }
    fetchData();
  });
  return (
    <div className="sm:grid sm:grid-rows-12  sm:gap-2 sm:py-10 sm:px-5 sm:w-auto sm:text-base text-sm w-full  h-screen  ">
      <div className="sm:hidden flex justify-between px-5 py-3 bg-white w-full border-b ">
        <Link href={"/dashboard"}>
          <div className="flex justify-around sm:mb-20  px-5 ">
            <Image className="w-8 h-8" src={logo} alt="logo" />
          </div>
        </Link>
        <h1 className="pt-1 text-lg">{username}</h1>
      </div>
      <div className="grid sm:grid-cols-3 sm:justify-between  sm:row-span-1 sm:w-auto w-full grid-cols-2 ">
        <div className=" p-5 ">current streak:11</div>
        <div className=" p-5 ">longest streak:123</div>
      </div>
      {/* <div className="p-5 rounded-lg row-span-1">Suggestions:🌇</div> */}
      <div className=" sm:grid sm:grid-cols-6 sm:p-2 p-5 sm:pt-auto pt-0  row-span-4">
        <Calendar searchParams={searchParams} />
        <div className="col-span-2 py-2 px-5">
          maths values like no of happy days and sad days and months average
          rating of life🌝
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-2 border border-yellow-300 p-5 rounded-lg row-span-6">
        <div>chart 1 monthly with overall score</div>
        <div>chart2 overall score </div>
      </div>
    </div>
  );
}
