import { ResetPasswordForm } from "@/components/ResetPasswordForm";
import React, { Suspense } from "react";

const ResetPassword = () => {
  return (
    <section className=" flex-center size-full max-sm:px-6 ">
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </section>
  );
};

export default ResetPassword;
