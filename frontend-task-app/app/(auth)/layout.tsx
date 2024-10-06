"use client";

import { store } from "@/redux/store";
import Image from "next/image";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Auth layout
    <main className=" flex min-h-screen w-full justify-between font-inter ">
      <Provider store={store}>
        <ToastContainer />
        {children}
      </Provider>
      <div className="auth-asset">
        <div>
          <Image
            src={"/icons/taskformlogo.svg"}
            alt="auth Image"
            width={500}
            height={500}
          />
        </div>
      </div>
    </main>
  );
}
