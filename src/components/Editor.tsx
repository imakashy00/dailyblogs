"use client";

import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import {
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
  useCreateBlockNote,
} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

async function uploadFile(file: File) {
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
export default function Editor() {
  const schema = BlockNoteSchema.create({
    blockSpecs: {
      ...defaultBlockSpecs,
      audio: undefined as any,
      file: undefined as any,
      video: undefined as any,
    },
  });

  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    schema,
    uploadFile,
    initialContent: [
      {
        type: "heading",
        content: "Welcome 🙏",
      },
      { type: "paragraph", content: "" },
      {
        type: "paragraph",
        content: "type '/' to get suggestions",
      },
      {
        type: "bulletListItem",
        content:
          "Insert heading, paragraph,bulletpoint image,emoji and text color on selecting text.. ",
      },
      {
        type: "bulletListItem",
        content: "Please signUp for launch discount",
      },
      {
        type: "bulletListItem",
        content:
          "Please share your feedback and suggestions 📧  yakashadav26@gmail.com",
      },
    ],
  });

  // Renders the editor instance using a React component.
  return (
    <BlockNoteView
      className="w-full bn-editor -m-20"
      editor={editor}
      sideMenu={true}
      editable={true}
      theme={"light"}
    />
  );
}
