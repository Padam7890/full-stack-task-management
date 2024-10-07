"use client";
import React from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BacktoLogin from "./reusable-componnets/BacktoLogin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ResetPasswordSchema } from "@/lib/schema";
import CustomInput from "./CustomInput";
import { Form } from "./ui/form";
import { useResetPasswordMutation } from "@/redux/api/user/user.api";
import { useRouter, useSearchParams } from "next/navigation";
import { handleError } from "@/utils/errorHandler";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

export function ResetPasswordForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");
  if (!token) router.push("/signin");
  const [RestPassword, { data, isLoading, isSuccess, isError, error }] =
    useResetPasswordMutation();
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    try {
      const datas: ResetPassword = {
        password: data.password,
        token: token as string,
      };
      await RestPassword(datas);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = form.handleSubmit(onSubmit);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      router.push("/signin");
    } else if (isError) {
      handleError(error);
    }
  }, [isSuccess, isError, error]);

  return (
    <section className="auth-form">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>Enter your new password below.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <CustomInput
                    label="New Password"
                    control={form.control}
                    type="password"
                    name="password"
                    placeholder="New Password"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <CustomInput
                    label="Confirm Password"
                    control={form.control}
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>

              <Button
                disabled={isLoading}
                type="submit"
                className="w-full mt-6 bg-blue-500"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />{" "}
                    &nbsp;Loading...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
          <BacktoLogin />
        </CardContent>
      </Card>
    </section>
  );
}
