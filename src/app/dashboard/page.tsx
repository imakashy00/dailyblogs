import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function Dashboard() {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return redirect("/signin");
  }
  return (
    <div className="flex justify-center items-center">
      <h1 className="text-7xl text-gray-800">Dashboard</h1>
    </div>
  );
}
