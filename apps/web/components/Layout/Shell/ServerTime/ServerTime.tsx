"use client";
import { useEffect, useState } from "react";
import { Box, em, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import {
  dateFormatMobileWithSecs,
  dateFormatWithSecs,
} from "@/utils/dateFormat";

import classes from "./ServerTime.module.css";

export function ServerTime() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const [serverTime, updateServerTime] = useState<Date>(new Date());

  useEffect(() => {
    setTimeout(() => updateServerTime(new Date()), 1000);
  }, [serverTime]);

  return (
    <Box className={classes.container}>
      {!isMobile && <Title order={4}>Server Time:</Title>}
      <Text>
        {isMobile
          ? dateFormatMobileWithSecs(serverTime)
          : dateFormatWithSecs(serverTime)}
      </Text>
    </Box>
  );
}
