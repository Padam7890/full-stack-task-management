"use client";

import { useGoogleAUthCodeMutation } from "@/redux/api/user/user.api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setToken } from "@/redux/slices/authSlice";
import { getToken, saveToken } from "@/utils/auth";
import { handleError } from "@/utils/errorHandler";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useCallback } from "react";

const Dashboard: React.FC = () => {
  const [exchangeAuthCode, { data, isError, error, isSuccess }] =
    useGoogleAUthCodeMutation();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  const params = useSearchParams();
  const router = useRouter();
  const code = params.get("code");
  const localToken = getToken();

  const navigateToSignIn = useCallback(() => {
    router.push("/signin");
  }, [router]);

  const handleAuthCode = useCallback(async () => {
    if (code) {
      try {
        await exchangeAuthCode({ code });
      } catch (err) {
        handleError(err);
      }
    }
  }, [code, exchangeAuthCode]);

  useEffect(() => {
    if (!localToken) {
      code ? handleAuthCode() : navigateToSignIn();
    }
  }, [localToken, code, handleAuthCode, navigateToSignIn]);

  useEffect(() => {
    if (isSuccess && data?.data?.access_token) {
      const accessToken = data.data.access_token;
      dispatch(setToken(accessToken));
      saveToken(accessToken); 
      router.push("/");
    } else if (isError) {
      handleError(error);
    }
  }, [isSuccess, isError, data, error, dispatch, router]);

  return <div>Dashboard page</div>;
};

export default Dashboard;
