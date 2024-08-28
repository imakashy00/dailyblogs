"use server";

import dbConnect from "@/lib/db";
import { UserModel } from "@/model/userModel";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { signIn } from "@/auth";

async function register(formdata: FormData) {
  const username = formdata.get("username") as string;
  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;
  console.log(username, email, password);

  if (!username || !email || !password) {
    throw new Error("-----Please provide all details-----");
  }
  await dbConnect();

  // search for existing user

  const existingUser = await UserModel.findOne({ email });
  const existingusername = await UserModel.findOne({ username });
  if (existingUser) {
    throw new Error("User already exist");
  } else if (existingusername) {
    throw new Error("Username already taken");
  } else {
    const hashedPassword = await hash(password, 10);
    await UserModel.create({ username, email, password: hashedPassword });
    console.info("User created successfully!!");
    redirect("/signin");
  }
}

async function login(formdata: FormData) {
  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error: any) {
    const someError = error as CredentialsSignin;
    return someError.cause;
  }
  redirect("/write");
}

export { register, login };
