"use client";
import { Box } from "@mantine/core";
import {
  IconCrown,
  IconHome,
  IconInfoCircle,
  IconListNumbers,
  IconPlus,
  IconReportAnalytics,
} from "@tabler/icons-react";

import { LoginButton } from "@/components/Auth/LoginButton";
import { RegisterButton } from "@/components/Auth/RegisterButton";
import { UserButton } from "@/components/Auth/UserButton";
import { useSession } from "@/hooks/auth/useSession";

import { Section } from "./Section";

import classes from "./Navbar.module.css";

const sections: NavSection[] = [
  {
    title: "System",
    links: [
      {
        icon: IconCrown,
        label: "Admin Dashboard",
        href: "/administration",
        role: "ADMINISTRATOR",
      },
      { icon: IconHome, label: "Home", href: "/" },
      { icon: IconInfoCircle, label: "About", href: "/" },
      { icon: IconReportAnalytics, label: "Statistics", href: "/" },
      { icon: IconListNumbers, label: "Tutorials", href: "/" },
    ],
  },
  {
    title: "Simulations",
    links: [
      { icon: IconInfoCircle, label: "My Simulations", href: "/simulations" },
      { icon: IconPlus, label: "New ACPYPE", href: "/simulations/acpype" },
      { icon: IconPlus, label: "New APO", href: "/simulations/apo" },
      {
        icon: IconPlus,
        label: "New PRODRG",
        href: "/simulations/prodrg",
        badge: { color: "red", message: "DEPRECATED" },
      },
    ],
  },
];

interface Props {
  toggle(): void;
}

export function Navbar({ toggle }: Props) {
  const { data } = useSession();
  const mainLinks = sections.map((section) => (
    <Section
      key={section.title}
      section={section}
      toggle={toggle}
      userRole={data?.user?.role}
    />
  ));

  return (
    <Box className={classes.container}>
      <Box className={classes.section}>
        {data?.session && data?.user ? (
          <UserButton user={data?.user} />
        ) : (
          <LoginButton />
        )}
      </Box>

      {data?.session ? (
        <Box className={classes.section}>
          <Box className={classes.mainLinks}>{...mainLinks}</Box>
        </Box>
      ) : (
        <Box className={classes.section}>
          <RegisterButton />
        </Box>
      )}
    </Box>
  );
}
