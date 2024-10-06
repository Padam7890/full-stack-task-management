"use client"

import Sidebar from "@/components/MenuItem"
import { menuItemList } from "@/helpers/menuitemlist"
import MobileMenu from "@/components/Mobilemenu"
import { profileItems } from "@/helpers/profileItem"
import SidebarHeader from "@/components/logo&notification"
import { store } from "@/redux/store"
import { Provider } from "react-redux"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation"
import { saveToken } from "@/utils/auth"


export default function RootLayout({children}: {children: React.ReactNode}) {

  const params = useSearchParams();
  const token = params.get("accesstoken");
  if (token) {
    // Split the token string to get the access token only
    const accessToken = token.split('?refreshtoken=')[0];
    console.log("Access Token:", accessToken);
    saveToken(accessToken);
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    <div className="hidden  border-r bg-muted/40 md:block">
      <div className="flex fixed h-full max-h-screen flex-col gap-2">
        <SidebarHeader  logoName = {"Task M"} />
        <div className="flex-1">
          <nav className="flex flex-col  items-start gap-5 px-2 text-sm font-medium lg:px-4">
            <Sidebar menuItems = {menuItemList} />
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

      <Provider store={store}> 
        <ToastContainer />
        {children}
      </Provider>

      </main>
    </div>
  </div>
  )
}
