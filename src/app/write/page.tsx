import { auth } from "@/auth";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const Editor = dynamic(() => import("../../components/Editor"), {
  ssr: false,
});

export default async function WritePage() {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return redirect("/signin");
  }
  return (
    <div className="mt-40 pl-80">
      <Editor />
    </div>
  );
}
