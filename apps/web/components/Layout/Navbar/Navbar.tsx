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

import { Login } from "@/components/Auth/Login/Login";
import { Register } from "@/components/Auth/Register/Register";
import { User } from "@/components/Auth/User/User";
import { useAuth } from "@/hooks/auth/useAuth";

import { Section } from "./Section/Section";

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
      { icon: IconInfoCircle, label: "About", href: "/about" },
      { icon: IconReportAnalytics, label: "Analytics", href: "/analytics" },
      { icon: IconListNumbers, label: "Tutorials", href: "/tutorials" },
    ],
  },
  {
    title: "Simulations",
    links: [
      { icon: IconInfoCircle, label: "My Simulations", href: "/simulations" },
      { icon: IconPlus, label: "New ACPYPE", href: "/simulations/acpype" },
      { icon: IconPlus, label: "New APO", href: "/simulations/apo" },
    ],
  },
];

interface Props {
  toggle(): void;
}

export function Navbar({ toggle }: Props) {
  const { data } = useAuth();

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
        {data?.session && data?.user ? <User /> : <Login />}
      </Box>

      {data?.session ? (
        <Box className={classes.section}>
          <Box className={classes.mainLinks}>{...mainLinks}</Box>
        </Box>
      ) : (
        <Box className={classes.section}>
          <Register />
        </Box>
      )}
    </Box>
  );
}
