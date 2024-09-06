'use client'
import Landing from "@/components/Landing";
import { useSession, signIn } from "next-auth/react";
import { useRouter, } from "next/navigation";

export default function Home() {
  // redirect signedin users to dashboard
  const router = useRouter(); // Move the declaration of 'router' to the top

  const { data: session } = useSession();

  // find if session. user is present redirect to dashboard by finding emial from session
  if(session?.user){
    console.log(session.user.email);
    router.replace('/dashboard');
  }

  return (
    <main className="flex m-auto w-full min-h-screen flex-col items-center justify-between">
      <Landing />
    </main>
  );
}
