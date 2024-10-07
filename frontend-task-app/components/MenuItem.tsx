"use client";
import { FC } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar: FC<sidebarProps> = ({ menuItems }) => {
  const pathname = usePathname();
  return (
    <div className=" flex flex-col gap-4 mt-8">
      {menuItems?.map((menu, index) => {
        const isActive = pathname === menu.href;

        return (
          <Link
            key={index}
            href={menu.href}
            className={`flex items-center gap-4 rounded-xl px-3 py-2 transition-all ${
              isActive
                ? " bg-blue-500 text-white"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            {menu.icon}
            {menu.title}
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
