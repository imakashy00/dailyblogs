"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
// import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";
import "@blocknote/mantine/style.css";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../../../public/books.png"; // Adjust the path to your logo image
const TextEditor = dynamic(() => import("@/components/TextEditor"), {
  ssr: false,
});

// { params }: { params: { date: string } }

const Jounal = ({ searchParams }: { searchParams: { date: string } }) => {
  const [date, setDate] = useState<string>(searchParams?.date);
  const [displayDate, setDisplaydate] = useState<string>("");
  const [initialdata, setInitialdata] = useState<PartialBlock[]>([]);
  const [tag, setTag] = useState<string>("");
  const [isLoading, setLoading] = useState(true);

  //   useEffect(() => {
  //     // Ensure that `params.date` exists before setting it
  //     if (searchParams?.date) {
  //       setDate(searchParams.date);
  //     }
  //   }, [searchParams]);

  const saveToDatabase = async (newBlocks: PartialBlock[]) => {
    try {
      const response = await axios.post("/api/journal", {
        tag,
        content: JSON.stringify(newBlocks),
      });
    } catch (error: any) {
      console.log("Error Storing data------------", error);
    }
  };
  useEffect(() => {
    if (!date) return;
    // Retrieve the existing data from database storage.
    const fetchFromDatabase = async () => {
      try {
        // console.log("date from params", params?.date);
        const storedContent = await axios.get(`/api/journal?date=${date}`);
        console.log(storedContent.data.journal.content);
        const parsedData = JSON.parse(
          storedContent.data.journal.content
        ) as PartialBlock[];
        console.log(storedContent.data.journal.tag);
        setTag(storedContent.data.journal.tag);
        setDisplaydate(storedContent.data.journal.createdAt);
        setInitialdata(parsedData);
        // console.log("-----------"+initialdata.length);
        setLoading(false);
        console.log(parsedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFromDatabase();
  }, [date]);
  const schema = BlockNoteSchema.create({
    blockSpecs: {
      ...defaultBlockSpecs,
      audio: undefined as any,
      file: undefined as any,
      video: undefined as any,
      // image: undefined as any,
    },
  });
  async function uploadFile(file: File) {
    //file: File
    const body = new FormData();
    body.append("file", file);

    const ret = await fetch("https://tmpfiles.org/api/v1/upload", {
      method: "POST",
      body: body,
    });
    return (await ret.json()).data.url.replace(
      "tmpfiles.org/",
      "tmpfiles.org/dl/"
    );
  }
  const editor: BlockNoteEditor = useCreateBlockNote(
    {
      schema,
      uploadFile,
      initialContent:
        initialdata.length > 0
          ? initialdata
          : [{ type: "paragraph", content: "" }],
    },
    [initialdata]
  );
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="rounded-xl border sm:py-5 sm:px-5 m-auto min-h-screen bg-white">
      <div className="sm:hidden flex justify-between px-5 py-3 bg-white w-full border-b  ">
        <Link href={"/dashboard"}>
          <div className="flex justify-around sm:mb-20  px-5 ">
            <Image className="w-8 h-8" src={logo} alt="logo" />
          </div>
        </Link>
        <h1 className="pt-1 text-lg">Journal</h1>
      </div>
      <div className="justify-around flex sm:flex-row flex-col pt-2 mb-5 px-5 items-center">
        <div className="flex justify-between  sm:w-auto w-full sm:px-auto px-4">
          <div className="flex sm:w-1/4 space-x-2">
            <div className="justify-center px-1 flex sm:w-4/5 sm:pt-auto pt-2">
              {new Date(displayDate).toDateString()}
            </div>
          </div>

          <Button
            className="bg-yellow-300 sm:mr-9 text-gray-800 hover:bg-yellow-200"
            disabled={tag.trim() === ""}
            onClick={() => saveToDatabase(editor.document)}
          >
            Save
          </Button>
        </div>
        <div className="m-auto sm:my-auto my-3">
          <input
            className=" p-1 pl-2 border font-bold text-xl"
            type="text"
            placeholder=" tag for today"
            required
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </div>
      </div>
      <BlockNoteView
        editor={editor}
        theme="light"
        editable={false}
        className="sm:-ml-5 -ml-3 sm:py-5 w-[400px]"
      />
    </div>
  );
};

export default Jounal;
