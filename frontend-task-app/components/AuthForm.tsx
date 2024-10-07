"use client";

import { useRouter } from "next/navigation";
import React, { useEffect} from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "./ui/button";
import { Form } from "@/components/ui/form";
import AuthInput from "./AuthInput";
import { Loader2 } from "lucide-react";
import {
  useSignInMutation,
  useSignUpMutation,
} from "@/redux/api/user/user.api";
import { handleError } from "@/utils/errorHandler";
import { saveToken } from "@/utils/auth";
import { AuthformSchema } from "@/lib/schema";
interface Props {
  type: "sign-in" | "sign-up";
}

// AuthForm component
const AuthForm = ({ type }: Props) => {
  const router = useRouter();

  const formSchema = AuthformSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Sign up mutation Using RTK Query
  const [
    signUp,
    {
      isLoading: signUpLoading,
      isSuccess: signUpSuccess,
      isError: signUpIsError,
      error: signUpError,
      data: signUpData,
    },
  ] = useSignUpMutation();

  const [
    signIn,
    {
      isLoading: signInLoading,
      isSuccess: signInSuccess,
      isError: signInIsError,
      error: signInError,
      data: signInData,
    },
  ] = useSignInMutation();

  // Submit form
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (type === "sign-up") {
        await signUp(data).unwrap();
      } else if (type === "sign-in") {
        await signIn(data).unwrap();
      }
    } catch (error) {
      console.log(error);
      // Error handling is moved to useEffect
    }
  };

  // Save token to sessionStorage
  useEffect(() => {
    if (signUpSuccess) {
      saveToken(signUpData?.access_token);
      router.push("/");
    }
    if (signInSuccess) {
      saveToken(signInData?.access_token);
      router.push("/");
    }
    if (signUpIsError) {
      handleError(signUpError);
    }
    if (signInIsError) {
      handleError(signInError);
    }
  }, [
    signUpSuccess,
    signInSuccess,
    signUpIsError,
    signInIsError,
    signUpError,
    signInError,
    router,
  ]);

  const googleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/login`;
  };
  // Render form
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href={"/"} className="cursor-pointer flex items-center gap-1">
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Task Management App
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="text-16 font-normal text-gray-600">
              {type === "sign-in"
                ? "Please enter your credentials"
                : "Create your account"}
            </p>
          </h1>
        </div>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {type === "sign-up" && (
            <AuthInput
              control={form.control}
              name="name"
              placeholder="Enter your full name"
              label="Full Name"
            />
          )}
          <AuthInput
            control={form.control}
            name="email"
            placeholder="Enter your Email"
            label="Email"
          />
          <AuthInput
            control={form.control}
            name="password"
            placeholder="Enter your Password"
            label="Password"
          />

          <div className="flex flex-col gap-4">
            <Button
              disabled={signUpLoading || signInLoading}
              className="form-btn"
              type="submit"
            >
              {signUpLoading || signInLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />{" "}
                  &nbsp;Loading...
                </>
              ) : type === "sign-in" ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>
        </form>
        <div className="flex items-center">
          <div className="flex-grow h-[1px] bg-gray-300"></div>
          <div className="px-4 text-sm text-gray-500 whitespace-nowrap">
            or continue with
          </div>
          <div className="flex-grow h-[1px] bg-gray-300"></div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={() => {
              googleLogin();
            }}
            variant="outline"
            type="button"
            className="flex items-center gap-2 hover:bg-blue-700 hover:text-white"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
            </svg>
            Sign in with Google
          </Button>
        </div>
        {type === "sign-in" && (
          <div className="flex justify-center">
            <Link
              href="/forget-password"
              className="text-14 text-black-900 underline dark:text-white"
            >
              Forget Password?
            </Link>
          </div>
        )}

        <footer className="flex justify-center gap-1 items-center">
          <p className="text-14 font-normal text-gray-600">
            {type === "sign-in"
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
          <Link href={`/${type === "sign-in" ? "signup" : "signin"}`}>
            {type === "sign-in" ? "Sign Up" : "Sign In"}
          </Link>
        </footer>
      </Form>
    </section>
  );
};

export default AuthForm;
