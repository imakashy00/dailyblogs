"use client";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";
import "@blocknote/mantine/style.css";
import React from "react";

 function loadFromStorage() {
  // Gets the previously stored editor contents.
  const storageString = localStorage.getItem("editorContent");
  console.log(storageString);
  return storageString
    ? (JSON.parse(storageString) as PartialBlock[])
    : undefined;
}

const editorContent =  loadFromStorage();
// export default async function SignIN() {

export default  function TextEditor () {

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: editorContent,
  });

  return (
    <div>
      <BlockNoteView editor={editor} theme="light" editable={false} />
    </div>
  );
};


