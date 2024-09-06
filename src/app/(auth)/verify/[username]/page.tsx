"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { verifySchema } from "@/schemas/verifySchema";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const VerifyAccount = () => {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post(`/api/verifyCode`, {
        username: params.username,
        code: data.code,
      });
      console.log(params.username);
      console.log(response);
      toast({
        title: "Account Verified",
        description: response.data.message,
        variant: "default",
      });
      router.replace("/signin");
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
    }
  };
  return (
    <div className="flex flex-col space-y-6  justify-center items-center min-h-screen ">
      <div className="w-full max-w-md space-y-8 rounded-lg shadow-md">
        <h2 className="font-bold text-2xl text-neutral-800">
          Verify your Account 🙏
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm">
          Enter the code sent to your email
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input placeholder="code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="py-2 m-auto mt-10 mb-1 bg-yellow-400 hover:bg-yellow-300 text-gray-800 flex items-center px-10"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerifyAccount;
