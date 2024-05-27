import { Box, Text } from "@mantine/core";

import classes from "./Log.module.css";

interface Props {
  logLines: string[];
}

export function Log({ logLines }: Props) {
  return (
    <Box className={classes.container}>
      {logLines.map((line, idx) => (
        <Text key={line + idx}>{line}</Text>
      ))}
    </Box>
  );
}
