import { ActionIcon, Avatar, Box, Group, Text } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";

import { invalidateAuth } from "@/actions/auth/invalidateAuth";
import { useAuth } from "@/hooks/auth/useAuth";

import classes from "./User.module.css";

export function User() {
  const { data } = useAuth();

  if (!data || !data.session || !data.user) {
    return null;
  }

  const userFullName = `${data.user.firstName} ${data.user.lastName}`;

  return (
    <Box className={classes.user}>
      <Group>
        <Avatar radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {userFullName.trim()}
          </Text>

          <Text c="dimmed" size="xs">
            {data.user.email}
          </Text>
        </div>

        <ActionIcon
          color="red"
          onClick={() => invalidateAuth()}
          size="lg"
          variant="light"
        >
          <IconLogout size={18} />
        </ActionIcon>
      </Group>
    </Box>
  );
}
