"use client";

import React, { useEffect, useState } from "react";
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
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearTokens, getTokens } from "@/redux/slices/authSlice";


const Profile: React.FC<ProfileProps> = ({ profileMenuItems }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const [name, setName] = useState<string | undefined>("Stranger");

  const logout = (href: string) => {
    dispatch(clearTokens()); 
    router.push(href);
  };

  useEffect(() => {
    dispatch(getTokens()); 
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      const decoded = jwt.decode(token) as { name?: string };
      if (decoded?.name) {
        setName(decoded.name);
      }
    }
  }, [token]);

  return (
    <div>
      {profileMenuItems ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex gap-4 items-center justify-center">
              <p className="capitalize">Hey, {name}</p>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {profileMenuItems.map((item, index) => (
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
          <Button variant="link" onClick={() => router.push("/signin")}>
            Sign In
          </Button>
        </div>
      )}
    </div>
  );
};

export default Profile;
