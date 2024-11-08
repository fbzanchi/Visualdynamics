"use client";
import { PropsWithChildren } from "react";
import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import dynamic from "next/dynamic";

import { LoadingBox } from "@/components/LoadingBox";
import { Logo } from "@/components/Logo";
import { ServerTime } from "@/components/RunningSimulation/ServerTime/ServerTime";
import { queryClient } from "@/lib/queryClient";

import classes from "./Shell.module.css";

const Navbar = dynamic(
  () => import("@/components/Layout/Navbar/Navbar").then((mod) => mod.Navbar),
  {
    loading: LoadingBox,
    ssr: false,
  }
);

export function Shell({ children }: PropsWithChildren) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        classNames={{
          root: classes.rootContainer,
          main: classes.mainContainer,
          footer: classes.footer,
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group
            align="center"
            justify="space-between"
            h="100%"
            w="100%"
            px="md"
          >
            <Group>
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
              <Logo />
            </Group>
            <ServerTime />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar px="md">
          <Navbar toggle={toggle} />
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
