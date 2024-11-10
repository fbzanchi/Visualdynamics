"use client";
import { Box } from "@mantine/core";

import { Loader } from "./Loader";

import classes from "./CenteredLoader.module.css";

export function CenteredLoader() {
  return (
    <Box className={classes.container}>
      <Loader />
    </Box>
  );
}
