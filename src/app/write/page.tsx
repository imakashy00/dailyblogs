import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../../components/Editor"), {
  ssr: false,
});

export default function WritePage() {
  return (
    <div className="mt-40 pl-80">
      <Editor />
    </div>
  );
}
