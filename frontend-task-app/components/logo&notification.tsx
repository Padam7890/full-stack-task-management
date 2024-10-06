"use client";

import { Bell, Package2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

interface Props {
  logoName: string;
}

const SidebarHeader = ({ logoName }: Props) => {
  return (
    <div className="relative flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <Package2 className="h-6 w-6" />
        <span>{logoName}</span>
      </Link>
    </div>
  );
};

export default SidebarHeader;
