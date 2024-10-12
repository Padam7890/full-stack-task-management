"use client";

import React, { Suspense } from "react";
import Sidebar from "@/components/MenuItem";
import { menuItemList } from "@/helpers/menuitemlist";
import MobileMenu from "@/components/Mobilemenu";
import { profileItems } from "@/helpers/profileItem";
import SidebarHeader from "@/components/logo&notification";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex fixed h-full max-h-screen flex-col gap-2">
            <SidebarHeader logoName={"Task M"} />
            <div className="flex-1">
              <nav className="flex flex-col items-start gap-5 px-2 text-sm font-medium lg:px-4">
                <Sidebar menuItems={menuItemList} />
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <MobileMenu
            menuItems={menuItemList}
            profileMenuItems={profileItems}
          />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <ToastContainer />
            {children}
          </main>
        </div>
      </div>
    </Provider>
  );
}
