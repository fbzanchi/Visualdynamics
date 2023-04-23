import { useContext } from "react";

import { Main } from "@app/components/Container/Main";
import { Header } from "@app/components/Header";
import { Sidebar } from "@app/components/Sidebar";
import { SidebarContext, SidebarProvider } from "@app/context/SidebarContext";
import { useTheme } from "@app/context/ThemeContext";

interface ILayout {
  children: React.ReactNode;
}

export function Layout({ children }: ILayout) {
  const { isSidebarOpen } = useContext(SidebarContext);
  const { theme } = useTheme();

  return (
    <SidebarProvider>
      <div
        className={`h-screen ${theme} ${isSidebarOpen && "overflow-hidden"}`}
      >
        <div
          className={`transition-all duration-150 flex flex-1 bg-white dark:bg-gray-900`}
        >
          <Sidebar />
          <div className="flex flex-col flex-1 lg:overflow-y-hidden">
            <Header />
            <Main>{children}</Main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
