"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import * as z from "zod";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // Add this line
import { redirect, useRouter } from "next/navigation";
import { signInSchema } from "@/schemas/signInSchema";
import { useSession, signIn } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";

export default function SignIn() {
  const router = useRouter(); // Move the declaration of 'router' to the top

  // const { data: session } = useSession();

  // find if session. user is present redirect to dashboard by finding emial from session
  // if(session?.user){
  //   console.log(session.user.email);
  //   router.replace('/dashboard');
  // }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // zod validation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    console.log();
    if (result?.error) {
      setIsSubmitting(false);
      toast({
        title: "Signin failed",
        description: result.error,
        variant: "destructive",
      });
      return;
    }
    console.log("------------------------------");
    console.log(result);
    if (result?.url) {
      setIsSubmitting(false);
      router.replace("/dashboard");
    }
  };

  return (
    <div className="flex flex-col space-y-6  justify-center items-center min-h-screen ">
      <div className="w-full max-w-md space-y-8 rounded-lg shadow-md">
        <h2 className="font-bold text-2xl text-neutral-800">
          Welcome to Dailyblogs 🙏
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm">
          SignIn and resume your documentation journey
        </p>

        {/* ...form is coming from useForm hook declared above */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="py-2 m-auto mt-10 mb-1 bg-yellow-400 hover:bg-yellow-300 text-gray-800 flex items-center px-10"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mx-2 animate-spin" />{" "}
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  SignIn<span className="text-3xl -mt-2">&rarr;</span>
                </>
              )}
            </Button>
          </form>
        </Form>
        <p>
          Don&apos;t have an Account?
          <Link className="text-yellow-500 underline" href={"/signup"}>
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
}
