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
