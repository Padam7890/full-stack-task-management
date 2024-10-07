import ForgetForm from "@/components/ForgetForm";
import { Suspense } from "react";

const ForgetPassword = () => {
  return (
    <section className=" flex-center size-full max-sm:px-6">
      <Suspense fallback={<div>Loading...</div>}>
        <ForgetForm />
      </Suspense>
    </section>
  );
};

export default ForgetPassword;
