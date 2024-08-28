import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github } from "lucide-react";
import { FaGoogle } from "react-icons/fa6";
import Link from "next/link";
import React from "react";
import { login } from "../../../action/user";
import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function SignIN() {
  const session = await auth();
  const user = session?.user;
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="mt-10 max-w-md w-full mx-auto rounded md:rounded-2xl p-4 md:p-8 shadow-input bg-white border border-[#121212] dark:bg-black">
      <h2 className=" justify-center flex font-bold text-2xl">
        👏 Welcome back
      </h2>
      <form className="my-10" action={login}>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="email"
          type="email"
          name="email"
          className="mb-5 mt-2"
        />
        <Label htmlFor="email">Password</Label>
        <Input
          id="password"
          placeholder="*******"
          type="password"
          name="password"
          className="mb-5 mt-2"
        />
        <Button className="py-2 m-auto mt-10 mb-1 bg-yellow-400 hover:bg-yellow-300 text-gray-800 flex items-center px-10">
          Login <span className="text-3xl -mt-2">&rarr;</span>
        </Button>
        <p>
          Dont have account?
          <Link className="text-yellow-500 underline" href={"/signup"}>
            SignUp
          </Link>
        </p>
      </form>
      <section className="flex justify-around">
        <form
          action={async () => {
            "use server";
            await signIn("github");
          }}
        >
          <button className="flex py-2 px-4 border border-gray-400 rounded ">
            {" "}
            <Github className="text-gray-700 size-6 mr-2" /> <span>Github</span>{" "}
          </button>
        </form>
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button className="flex py-2 px-4 border border-gray-400 rounded ">
            {" "}
            <FaGoogle className="text-gray-700 mr-2 size-6 t-1" />{" "}
            <span>Google</span>{" "}
          </button>
        </form>
      </section>
    </div>
  );
}
