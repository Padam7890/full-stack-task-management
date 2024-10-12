"use client";

import { useGoogleAUthCodeMutation } from "@/redux/api/user/user.api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setToken } from "@/redux/slices/authSlice";
import { getToken, saveToken } from "@/utils/auth";
import { handleError } from "@/utils/errorHandler";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useCallback } from "react";

const Dashboard = () => {
  const [exchangeAuthCode, { data, isError, error, isSuccess }] =
    useGoogleAUthCodeMutation();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  const params = useSearchParams();
  const router = useRouter();
  const code = params.get("code");
  const navigateToSignIn = useCallback(() => router.push("/signin"), [router]);

  const handleAuthCode = useCallback(async () => {
    if (code) await exchangeAuthCode({ code });
  }, [code, exchangeAuthCode]);

  useEffect(() => {
    if (!token && !code) {
      navigateToSignIn();
    } else if (code && !token) {
      handleAuthCode();
    }
  }, [token, code, handleAuthCode, navigateToSignIn]);

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      dispatch(setToken(data.data.access_token));
      router.push("/");
    } else if (isError) {
      handleError(error);
    }
  }, [isSuccess, isError, data, error, router]);

  return <div>Dashboard page</div>;
};

export default Dashboard;
