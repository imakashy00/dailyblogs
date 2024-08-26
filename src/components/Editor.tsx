"use client";

import {
  BlockNoteSchema,
  defaultBlockSpecs,
  filterSuggestionItems,
  insertOrUpdateBlock,
} from "@blocknote/core";
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
        content: "Hello Welcome 🙏",
      },
      {
        type: "paragraph",
        content: "Experiemnt with the editor",
      },
      {
        type: "paragraph",
        content:
          "Type / commands to get suggestion for emoji texts, points image and select text to get floating toolbar drag and rop the element using lefy side hanlde ",
      },
      {
        type: "paragraph",
        content: "",
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Feedback and Suggestion are welcome:      ✉️ yakashadav26@gmail.com",
            styles: { bold: true },
          },
        ],
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
