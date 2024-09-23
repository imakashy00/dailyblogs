"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Minus, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../../../public/books.png"; // Adjust the path to your logo image

export default function Tags() {
  const [tags, setTags] = useState<[string]>([""]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      // fetch data from backend of tags using axios
      const result = await axios.get("/api/tags");
      // console.log(result.data);
      setTags(result.data.tags);
      console.log(result.data.tags);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const openTag = async (tag: string) => {
    router.replace(`/dashboard/tags/${tag}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full  sm:p-10 h-auto ">
      <div className="sm:hidden flex justify-between px-5 py-3 bg-white w-full border-b  ">
        <Link href={"/dashboard"}>
          <div className="flex justify-around sm:mb-20  px-5 ">
            <Image className="w-8 h-8" src={logo} alt="logo" />
          </div>
        </Link>
        <h1 className="pt-1 text-lg">Tags</h1>
      </div>
      <div className="flex items-center border-2 bg-white rounded-xl sm:w-full w-4/5 m-auto sm:mt-auto mt-5 sm:mb-5 focus-within:border-yellow-400 p-2">
        <Search className="text-gray-400" size={20} />
        <input
          className="w-full pl-2 focus:outline-none"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="grid sm:grid-cols-3 grid-cols-2 sm:gap-10 gap-2 sm:mt-auto mt-5 sm:px-auto px-5">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="border flex flex-col justify-around border-yellow-400 sm:min-h-[200px] min-h-[150px] sm:p-5 p-2 rounded-xl items-center"
          >
            {tag}
            <Button
              className="bg-yellow-400 text-gray-800 hover:bg-yellow-300"
              onClick={() => openTag(tag)}
            >
              Open
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
