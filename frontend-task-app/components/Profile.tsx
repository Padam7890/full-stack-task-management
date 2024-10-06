"use client"
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Button } from "../components/ui/button"
import { CircleUser } from "lucide-react"
import { clearToken } from '@/utils/auth'
import { LinkProps } from 'next/link'
import { useRouter } from 'next/navigation'

const Profile = ({ profileMenuItems }: any) => {
  const router = useRouter();

  const logout = (href:string)=> {
    clearToken();
    router.push(href)
  }
  return (
    <div>
      {profileMenuItems ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {profileMenuItems.map((item: any, index: number) => (
              <DropdownMenuItem key={index}>
                <a onClick={()=> logout(item.href)} className="block px-4 text-sm text-gray-700 hover:text-gray-900">
                  {item.label}
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div>
            //login button below
            <Button variant="link">
              Sign In
            </Button>


        </div>
      )}
    </div>
  )
}

export default Profile
