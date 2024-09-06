"use client";
import React, { useState, useEffect } from "react";
import { Block } from "@blocknote/core";
import axios from "axios";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
            <p key={contentIndex}>{`${
              innerContent?.text?.length > 20
                ? innerContent.text.slice(0, 20) + "..."
                : innerContent?.text
            }`}</p>
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
    <div className="border  p-5 w-full m-auto min-h-screen">
      <h1 className="text-3xl text-gray-800 justify-center flex">
        Journals for Tag: {params.tag}
      </h1>
      <div className="my-5 grid grid-cols-3 gap-5 ">
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
