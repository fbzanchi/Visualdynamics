"use client";
import { useEffect, useState } from "react";
import { Box, Text, Title } from "@mantine/core";

import { dateFormatWithSecs } from "@/utils/dateFormat";

import classes from "./ServerTime.module.css";

export function ServerTime() {
  const [serverTime, updateServerTime] = useState<Date>(new Date());

  useEffect(() => {
    setTimeout(() => updateServerTime(new Date()), 1000);
  }, [serverTime]);

  return (
    <Box className={classes.container}>
      <Title order={4}>Server Time:</Title>
      <Text>{dateFormatWithSecs(serverTime)}</Text>
    </Box>
  );
}
