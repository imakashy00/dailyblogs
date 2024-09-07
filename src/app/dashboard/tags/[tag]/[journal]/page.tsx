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
const TextEditor = dynamic(() => import("@/components/TextEditor"), {
  ssr: false,
});

// { params }: { params: { date: string } }

const Jounal = ({searchParams}:{searchParams:{date:string}}) => {
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
    <div className="rounded-xl border py-5 px-5 m-auto min-h-screen bg-white">
      <div className="justify-around flex pt-2 mb-5 px-5 items-center">
        <div className="flex w-1/4 space-x-2">
          <div className="justify-center px-1 flex w-4/5">
            {new Date(displayDate).toDateString()}
          </div>
        </div>
        <input
          className=" p-1 pl-2 w-2/4 border font-bold text-xl"
          type="text"
          placeholder=" tag for today"
          required
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <Button
          className="bg-yellow-300 mr-9 text-gray-800 hover:bg-yellow-200"
          disabled={tag.trim() === ""}
          onClick={() => saveToDatabase(editor.document)}
        >
          Save
        </Button>
      </div>
      <BlockNoteView
        editor={editor}
        theme="light"
        editable={false}
        className="-ml-5 py-5"
      />
    </div>
  );
};

export default Jounal;
