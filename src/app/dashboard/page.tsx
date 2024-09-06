'use client'
import React from "react";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import {useRouter} from 'next/navigation'



export default function Dashboard() {
  const router = useRouter(); // Move the declaration of 'router' to the top
  
  return (
    <div className=" flex border p-10  h-screen">
      <h1 className="text-7xl text-red-800">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
        deserunt assumenda hic! Impedit, eaque provident? Soluta qui saepe,
        consequatur culpa recusandae quos tempora est? Eveniet voluptatem esse
        repellat nemo vero.
      </h1>
    </div>
  );
}
