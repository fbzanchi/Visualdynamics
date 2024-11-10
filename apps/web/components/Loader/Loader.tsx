"use client";
import React, { useMemo } from "react";
import { Box } from "@mantine/core";
import { motion } from "framer-motion";

import classes from "./Loader.module.css";

const variants = {
  start: {
    scale: 0.2,
    rotate: 0,
  },
  end: {
    scale: 1,
    rotate: 360,
  },
};

interface Props {
  steps?: number;
}

export function Loader({ steps = 3 }: Props) {
  const stepsArr = useMemo(() => [...Array(steps)], [steps]);

  const duration = useMemo(() => Math.max(0.2 * steps, 1), [steps]);

  return (
    <Box className={classes.container}>
      {stepsArr.map((_, idx) => (
        <motion.div
          key={`loader-square-${idx}`}
          className={classes.square}
          variants={variants}
          initial={"start"}
          animate={"end"}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            ease: "anticipate",
            duration,
            delay: 0.2 * idx,
          }}
        />
      ))}
    </Box>
  );
}
