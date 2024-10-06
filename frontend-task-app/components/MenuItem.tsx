"use client"

import React from 'react'
import Link from "next/link"
import { usePathname } from 'next/navigation'
  
import { Badge } from "../components/ui/badge"


const Sidebar = ({ menuItems }:any) => {
  const pathname = usePathname();
  return (
    <div className=' flex flex-col gap-4 mt-8'>
      {menuItems?.map((menu:any, index:number) => {
        const isActive = pathname === menu.href

        return (
          <Link
            key={index}
            href={menu.href}
            className={`flex items-center gap-4 rounded-xl px-3 py-2 transition-all ${
              isActive ? ' bg-blue-500 text-white' : 'text-muted-foreground hover:text-primary'
            }`}
          >
            {menu.icon}
            {menu.title}
            {menu.isNotification && (
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
               
              </Badge>
            )}
          </Link>
        )
      })}
    </div>
  )
}

export default Sidebar
