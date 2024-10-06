"use client";

import { getToken } from "@/utils/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Dashboard = () => {
  //checking if user is logged in using sessionStorage
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push("/signin");
    }
  }, [router]);
  return <div>Dashboard page</div>;
};

export default Dashboard;
