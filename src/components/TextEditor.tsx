"use client";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";
import "@blocknote/mantine/style.css";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { redirect } from "next/navigation";
import logo from "../../public/books.png";
import Link from "next/link";
import Image from "next/image";

async function saveToStorage(newBlocks: PartialBlock[]) {
  // Retrieve the existing data from local storage.
  const existingData = localStorage.getItem("editorContent");
  const existingBlocks = existingData
    ? (JSON.parse(existingData) as PartialBlock[])
    : [];

  // Merge the existing data with the new data.
  const mergedBlocks = [...existingBlocks, ...newBlocks];

  // Save the merged contents back to local storage.
  localStorage.setItem("editorContent", JSON.stringify(mergedBlocks));
}
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

const TextEditor: React.FC = () => {
  const [date, setDate] = useState(new Date().toDateString());
  const [editable, setEditable] = useState<boolean>(true);
  const [initialdata, setInitialdata] = useState<PartialBlock[]>([]);
  const [tag, setTag] = useState<string>("");
  const [isLoading, setLoading] = useState(true);

  const previousDate = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    setDate(newDate.toDateString());
    setInitialdata([]);
  };

  const nextDate = () => {
    // initial value should be the 'date'
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    setDate(newDate.toDateString());
    setInitialdata([]);
  };

  // save data to databse using strigify method
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
    // Retrieve the existing data from database storage.
    const fetchFromDatabase = async () => {
      try {
        const storedContent = await axios.get(`/api/journal?date=${date}`);
        console.log(storedContent.data.journal.content);
        const parsedData = JSON.parse(
          storedContent.data.journal.content
        ) as PartialBlock[];
        console.log(storedContent.data.journal.tag);
        setTag(storedContent.data.journal.tag);
        setInitialdata(parsedData);
        // console.log("-----------"+initialdata.length);
        setLoading(false);
        console.log(parsedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFromDatabase();
    if (date !== new Date().toDateString()) {
      setEditable(false);
    } else {
      setEditable(true);
    }
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

  // Update the editor once initialdata is set

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="sm:rounded-xl sm:border sm:py-5 sm:px-5 m-auto min-h-screen bg-white sm:w-auto w-[390px]  sm:text-base text-sm">
      <div className="justify-around sm:w-auto w-full hidden sm:flex pt-2 sm:mb-5 sm:px-5 items-center">
        <div className="flex sm:w-1/4 sm:space-x-2">
          {/* disable button if date is 1 sept 2024 */}
          <button
            onClick={previousDate}
            disabled={date === new Date("2024-09-01").toDateString()}
            title="Previous Date"
          >
            <ChevronLeft />
          </button>
          <div className="justify-center sm:px-1 flex sm:w-4/5 border ">
            {date}
          </div>
          <button
            onClick={nextDate}
            disabled={date === new Date().toDateString()}
            title="Next Date"
          >
            <ChevronRight />
          </button>
        </div>
        <input
          className=" p-1 pl-2 w-2/4 border font-bold sm:text-xl "
          type="text"
          placeholder=" tag for today"
          required
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        {/* <span className="text-3xl">😊</span> */}
        <Button
          className="bg-yellow-300 sm:mr-9 text-gray-800 hover:bg-yellow-200 sm:w-auto w-[40px] sm:text-base text-xs"
          disabled={tag.trim() === ""}
          onClick={() => saveToDatabase(editor.document)}
        >
          Save
        </Button>
      </div>
      {/* for small devices */}
      <div className="sm:hidden flex flex-col p-2 w-full">
        <div className="flex justify-around ">
          <Link href={"/dashboard"}>
            <div className="flex justify-around ">
              <Image className="w-8 h-8" src={logo} alt="logo" />
            </div>
          </Link>
          <div className="flex sm:w-1/4 sm:space-x-2">
            {/* disable button if date is 1 sept 2024 */}
            <button
              onClick={previousDate}
              disabled={date === new Date("2024-09-01").toDateString()}
              title="Previous Date"
            >
              <ChevronLeft />
            </button>
            <div className="justify-center px-2 pt-2 flex sm:w-4/5  ">
              {date}
            </div>
            <button
              onClick={nextDate}
              disabled={date === new Date().toDateString()}
              title="Next Date"
            >
              <ChevronRight />
            </button>
          </div>
          <Button
            className="bg-yellow-300  text-gray-800 hover:bg-yellow-200 h-[30px] mt-1 w-[60px] sm:text-base text-sm"
            disabled={tag.trim() === ""}
            onClick={() => saveToDatabase(editor.document)}
          >
            Save
          </Button>
        </div>
        <div className="flex w-4/5 m-auto my-3  mx-12">
          <input
            className="flex justify-center p-1 pl-2 w-full border font-semibold "
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
        editable={editable}
        className="sm:-ml-5 sm:py-5 sm:pr-auto -pr-[20px] "
      />
    </div>
  );
};

export default TextEditor;
