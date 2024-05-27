import { PropsWithChildren } from "react";
import { Box, BoxProps } from "@mantine/core";

export function Container({
  className,
  children,
  ...props
}: PropsWithChildren<BoxProps>) {
  return (
    <Box className={className} {...props}>
      {children}
    </Box>
  );
}
