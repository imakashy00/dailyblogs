"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import * as z from "zod";
import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // Add this line
import axios, { AxiosError } from "axios";
import { redirect, useRouter } from "next/navigation";
import { SignUpSchema } from "@/schemas/signUpSchemas";
import { ApiResponse } from "@/types/apiResponse";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

export default function SignUp() {
  // redirect signedin users to dashboard
  const router = useRouter(); // Move the declaration of 'router' to the top

  const { data: session } = useSession();

  // find if session. user is present redirect to dashboard by finding emial from session
  if (session?.user) {
    console.log(session.user.email);
    router.replace("/dashboard");
  }

  const [username, setUsername] = useState("");
  const [success, setSuccess] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounced = useDebouncedCallback((newname) => {
    setUsername(newname);
  }, 500);
  const { toast } = useToast();

  // zod validation
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage("");
        try {
          const response = await axios.get<ApiResponse>(
            `/api/checkUsernameUnique?username=${username}`
          );
          console.log(response);
          setUsernameMessage(response.data.message);
          setSuccess(response.data.success);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "An error occurred"
          );
          //explain meaning of ?? operator - it is a nullish coalescing operator that returns the right hand side if the left hand side is null or undefined
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    setSuccess(false);
    checkUsernameUnique();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>("/api/signup", data);
      toast({
        title: "Success",
        description: response.data.message,
        variant: "default",
      });
      router.replace(`/verify/${username}`);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.log("Error in signing up", error);
      let ErrorMessage =
        axiosError.response?.data.message ?? "An error occurred";
      toast({
        title: "Signup failed",
        description: ErrorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col space-y-6  justify-center items-center min-h-screen ">
      <div className="w-full max-w-md space-y-8 rounded-lg shadow-md">
        <h2 className="font-bold text-2xl text-neutral-800">
          Welcome to Dailyblogs 🙏
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm">
          SignUp for your documentation journey
        </p>

        {/* ...form is coming from useForm hook declared above */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex">
                    username{" "}
                    <span className="mx-5 -mt-1 ">
                      {isCheckingUsername && (
                        <Loader2 className="animate-spin" />
                      )}
                      <p
                        className={`text-sm ${
                          success === true ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {usernameMessage}
                      </p>
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debounced(e.target.value);
                      }}
                      placeholder="username"
                      type="text"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email"
                      type="text"
                      {...field}
                      // onChange={(e) => {
                      //   field.onChange(e);
                      //   setUsername(e.target.value);
                      // }} // this is not needed as we are not checking email uniqueness as username 🦄
                    />
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
                    <Input
                      placeholder="********"
                      type="password"
                      {...field}
                      // onChange={(e) => {
                      //   field.onChange(e);
                      //   setUsername(e.target.value);
                      // }} // this is not needed as we are not checking password uniqueness as username 🦄
                    />
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
                  <span>Signing Up...</span>
                </>
              ) : (
                <>
                  SignUp<span className="text-3xl -mt-2">&rarr;</span>
                </>
              )}
            </Button>
          </form>
        </Form>
        <p>
          Already have an Account?
          <Link className="text-yellow-500 underline" href={"/signin"}>
            Signin
          </Link>
        </p>
      </div>
    </div>
  );
}
