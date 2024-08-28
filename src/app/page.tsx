import Landing from "@/components/Landing";
import dynamic from "next/dynamic";

// const Editor = dynamic(() => import("../components/Editor"), { ssr: false });

export default function Home() {
  return (
    <main className="flex m-auto w-full min-h-screen flex-col items-center justify-between">
      <Landing />
    </main>
  );
}
