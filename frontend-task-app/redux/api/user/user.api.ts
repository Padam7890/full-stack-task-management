import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
    }),
    signUp: builder.mutation<IUserResponse, IUser>({
      query: (user) => ({
        url: "/auth/signup",
        method: "POST",
        body: user,
      }),
    }),
    signIn: builder.mutation<IUserResponse, IUser>({
      query: (user) => ({
        url: "/auth/signin",
        method: "POST",
        body: user,
      }),
    }),
    forgetPassword: builder.mutation<ForgetPasswordresponse, ForgetPassword>({
      query: (email) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: email,
      }),

    }),
    resetPassword: builder.mutation<ResetPasswordResponse, ResetPassword>({
      query: (resetPassword) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: resetPassword,
      }),
    }),
  
  }),
});

export const { useGetUsersQuery, useSignUpMutation, useSignInMutation ,useForgetPasswordMutation,useResetPasswordMutation} =
  userApi;
