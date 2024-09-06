"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Minus, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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
    <div className="w-full p-10 border min-h-screen ">
      <div className="flex items-center border-2 bg-white rounded-xl w-full mb-5 focus-within:border-yellow-400 p-2">
        <Search className="text-gray-400" size={20} />
        <input
          className="w-full pl-2 focus:outline-none"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="grid grid-cols-3 gap-10 ">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="border flex flex-col justify-around border-yellow-400 min-h-[200px] p-5 rounded-xl"
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
