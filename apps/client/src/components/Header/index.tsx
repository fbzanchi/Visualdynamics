import { useContext, useState } from "react";
import { Bell, LogIn, Menu, Moon, Search, Sun, UserPlus } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { Button } from "@app/components/Button";
import { TextButton } from "@app/components/Button/Text";
import { Input } from "@app/components/Input";
import { UserMenu } from "@app/components/UserMenu";
import { SidebarContext } from "@app/context/SidebarContext";
import { useTheme } from "@app/context/ThemeContext";

export function Header() {
  const { status } = useSession();
  const { toggleSidebar } = useContext(SidebarContext);
  const { theme, toggleTheme } = useTheme();
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  }

  return (
    <header className="sticky top-0 z-40 py-4 transition-all duration-150 bg-white lg:relative lg:top-auto shadow-bottom dark:bg-gray-900">
      <div className="container flex items-center justify-between h-full px-6 mx-auto gap-x-4 text-primary-600 dark:text-primary-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <Menu
            className="w-6 h-6"
            aria-hidden="true"
          />
        </button>
        {/* <!-- Search input --> */}
        <div className="justify-center hidden w-1/2 mx-auto lg:flex">
          <div className="relative flex-1 focus-within:text-primary-500 dark:focus-within:text-primary-100">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <Search
                className="w-4 h-4"
                aria-hidden="true"
              />
            </div>
            <Input
              className="w-full pl-8 dark:bg-gray-950"
              placeholder="Search for projects"
              aria-label="Search"
            />
          </div>
        </div>
        <ul className="flex items-center flex-shrink-0 gap-x-6">
          {/* <!-- Theme toggler --> */}
          <li className="flex">
            <TextButton
              iconClassName="stroke-primary-600 group-hover:stroke-primary-400 dark:stroke-primary-300 dark:group-hover:stroke-primary-400"
              LeftIcon={theme === "light" ? Moon : Sun}
              onClick={toggleTheme}
            />
          </li>
          {status === "authenticated" ? (
            <>
              {/* <!-- Notifications menu --> */}
              <li className="flex">
                <button
                  className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
                  onClick={handleNotificationsClick}
                  aria-label="Notifications"
                  aria-haspopup="true"
                >
                  <Bell
                    className="w-5 h-5"
                    aria-hidden="true"
                  />
                  {/* <!-- Notification badge --> */}
                  <span
                    aria-hidden="true"
                    className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
                  />
                </button>
              </li>
              {/* <!-- Profile menu --> */}
              <li className="relative">
                <UserMenu />
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/signin">
                  <Button LeftIcon={LogIn}>Sign In</Button>
                </Link>
              </li>
              <li className="hidden lg:block">
                <Link href="/register">
                  <TextButton LeftIcon={UserPlus}>Register</TextButton>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}
