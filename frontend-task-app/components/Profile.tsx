"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import { CircleUser } from "lucide-react";
import { clearToken, getToken } from "@/utils/auth";
import { useRouter } from "next/navigation";
import jwt, { Jwt } from "jsonwebtoken";

const Profile = ({ profileMenuItems }: any) => {
  const router = useRouter();

  const logout = (href: string) => {
    clearToken();
    router.push(href);
  };

  const token = getToken();
  let name: string | undefined = "Stranger";

  if (token) {
    const decryptToken = jwt.decode(token) as { name?: string };
    if (decryptToken && decryptToken.name) {
      name = decryptToken.name;
    }
  }

  return (
    <div>
      {profileMenuItems ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className=" flex gap-4 items-center justify-center">
              <p className=" capitalize">Hey, {name}</p>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {profileMenuItems.map((item: any, index: number) => (
              <DropdownMenuItem key={index}>
                <a
                  onClick={() => logout(item.href)}
                  className="block px-4 text-sm text-gray-700 hover:text-gray-900"
                >
                  {item.label}
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div>
          //login button below
          <Button variant="link">Sign In</Button>
        </div>
      )}
    </div>
  );
};

export default Profile;
