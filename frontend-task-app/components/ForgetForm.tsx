"use client";

import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { useForgetPasswordMutation } from "@/redux/api/user/user.api";
import { handleError } from "@/utils/errorHandler";
import { toast } from "react-toastify";
import BacktoLogin from "./reusable-componnets/BacktoLogin";
import Loader from "../components/reusable-componnets/Loader"

const ForgetForm = () => {
  const [
    ForgetPassword,
    { data: responseData, isError, isLoading, isSuccess, error },
  ] = useForgetPasswordMutation();
  const ForgetPasswordSchema = z.object({
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
  });

  const form = useForm<z.infer<typeof ForgetPasswordSchema>>({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ForgetPasswordSchema>) => {
    await ForgetPassword({ email: data.email });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.info(responseData.message);
    } else if (isError) {
      handleError(error);
    }
  }, [isSuccess, isError]);

  return (
    <section className="auth-form">
      <div className="flex h-screen w-full items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
        <div className="w-full max-w-md space-y-4">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Forgot Password</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>
          <Card className="p-10 max-w-[800px]">
            <CardContent className="space-y-4">
              <Form {...form}>
                <form
                  className=" flex flex-col gap-6"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <div className="space-y-2">
                    <CustomInput
                      label="Email Address"
                      control={form.control}
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <Button disabled={isLoading} type="submit" className="w-full bg-blue-700">
                    {isLoading? <Loader/> : "Send Password Reset Link"}
                  </Button>
                </form>
              </Form>
              <BacktoLogin/>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ForgetForm;
