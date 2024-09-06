"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const TextEditor = dynamic(() => import("../../../components/TextEditor"), {
  ssr: false,
});
export default function Write() {
  const router = useRouter(); // Move the declaration of 'router' to the to  

  return (
    <div className="w-full ">      
      <TextEditor/>
    </div>
  );
}
