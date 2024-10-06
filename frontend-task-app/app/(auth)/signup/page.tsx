import AuthForm from "@/components/AuthForm";
import React from "react";

// Signup page
const Signup = () => {
  return (
    <section className=" flex-center size-full max-sm:px-6">
      <AuthForm type="sign-up" />
    </section>
  );
};

export default Signup;
