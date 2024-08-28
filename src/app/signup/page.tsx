import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";
import { register } from "../../../action/user";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function SignUp() {
  const session = await auth();
  const user = session?.user;
  if (user) {
    redirect("/dashboard");
  }
  return (
    <div className="mt-10 max-w-md w-full mx-auto rounded md:rounded-2xl p-4 md:p-8 shadow-input bg-white border border-[#121212] dark:bg-black">
      <h2 className="font-bold text-2xl text-neutral-800">
        Welcome to Dailyblogs 🙏
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2">
        Please provide the details
      </p>
      <form action={register} className="my-10">
        <div>
          <Label htmlFor="username">username</Label>
          <Input
            className="mt-2"
            id="username"
            placeholder="username"
            type="text"
            name="username"
          />
        </div>
        <div className="my-5">
          <Label htmlFor="email">email</Label>
          <Input
            className="mt-2"
            id="email"
            placeholder="email"
            type="email"
            name="email"
          />
        </div>
        <div>
          <Label htmlFor="password">password</Label>
          <Input
            className="mt-2"
            id="password"
            placeholder="********"
            type="password"
            name="password"
          />
        </div>
        <Button className="py-2 m-auto mt-10 mb-1 bg-yellow-400 hover:bg-yellow-300 text-gray-800 flex items-center px-10">
          SignUp<span className="text-3xl -mt-2">&rarr;</span>
        </Button>
        <p>
          Already have an Account?
          <Link className="text-yellow-500 underline" href={"/signin"}>
            Signin
          </Link>
        </p>
      </form>
    </div>
  );
}
