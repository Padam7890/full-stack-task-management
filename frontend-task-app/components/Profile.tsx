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
import { clearToken, getToken } from "@/utils/auth";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";

type ProfileProps ={
  profileMenuItems:ProfileItem[]
}

const Profile : React.FC<ProfileProps> = ({profileMenuItems}) => {
  const router = useRouter();
  const [name, setName] = useState<string | undefined>("Stranger"); 

  const logout = (href: string) => {
    clearToken();
    router.push(href);
  };


  useEffect(() => {
    const token = getToken();
    if (token) {
      const decryptToken = jwt.decode(token) as { name?: string };
      if (decryptToken && decryptToken.name) {
        setName(decryptToken.name);
      }
    }
  }, []);

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
