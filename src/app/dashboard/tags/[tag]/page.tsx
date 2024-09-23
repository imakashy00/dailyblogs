"use client";
import React, { useState, useEffect } from "react";
import { Block } from "@blocknote/core";
import axios from "axios";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../../public/books.png";
const TagPage = ({ params }: { params: { tag: string } }) => {
  const router = useRouter();
  const [journals, setJournals] = useState<
    { tag: string; content: string; createdAt: Date }[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params.tag) {
      // console.log(params.tag);
      const fetchJournals = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `/api/journalsOfTag/?tag=${params.tag}`
          ); //
          setJournals(response.data.journals);
          console.log(response.data.journals);
        } catch (error) {
          console.error("Error fetching journals:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchJournals();
    }
  }, [params.tag]);

  // Function to render the content blocks
  const renderBlocks = (content: string) => {
    const parsedContent = JSON.parse(content) as PartialBlock[];
    return parsedContent.map((block, blockIndex) => (
      <div key={blockIndex}>
        {Array.isArray(block.content) &&
          block.content.map((innerContent, contentIndex) => (
            <p key={contentIndex}>
              {(innerContent as any).text?.length > 20
                ? (innerContent as any).text.slice(0, 20) + "..."
                : (innerContent as any).text}
            </p>
          ))}
      </div>
    ));
  };

  const openJournal = (date: Date) => () => {
    // console.log(date);
    // console.log(new Date(date).toDateString());
    // Open
    router.replace(
      `/dashboard/tags/${params.tag}/${new Date(date).toDateString()}`
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sm:p-5 w-full m-auto min-h-screen">
      <div className="sm:hidden flex justify-between px-5 py-3 bg-white w-full border-b  ">
        <Link href={"/dashboard"}>
          <div className="flex justify-around sm:mb-20  px-5 ">
            <Image className="w-8 h-8" src={logo} alt="logo" />
          </div>
        </Link>
        <h1 className="pt-1 text-lg">Tags</h1>
      </div>
      <h1 className="sm:text-3xl text-xl text-gray-800 justify-center p-5 flex">
        Journals for Tag: {params.tag}
      </h1>
      <div className="sm:my-5 grid sm:grid-cols-3 gap-5 p-5 ">
        {journals.length > 0 ? (
          journals.map((journal, index) => (
            <div
              key={index}
              className="border-2 shadow-md space-y-3 rounded-md p-5"
            >
              {/* Call renderBlocks to display journal content */}
              {renderBlocks(journal.content)}
              <div className="flex justify-between">
                <p>{new Date(journal.createdAt).toDateString()}</p>
                <Link
                  href={{
                    pathname: `/dashboard/tags/${params.tag}/${new Date(
                      journal.createdAt
                    ).toDateString()}`,
                    query: { date: new Date(journal.createdAt).toDateString() },
                  }}
                >
                  <Button className="bg-yellow-400 hover:bg-yellow-300 text-gray-800">
                    Open
                  </Button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No journals found for this tag.</p>
        )}
      </div>
    </div>
  );
};

export default TagPage;
