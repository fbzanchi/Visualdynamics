import { useEffect, useState } from "react";
import { Text } from "@mantine/core";
import dayjs from "dayjs";

import { useRunningSimulation } from "@/hooks/simulation/useRunningSimulation";

export function RefetchTime() {
  const [nextRefetchAt, updateNextRefetchAt] = useState<Date>();
  const [secsToRefetch, updateSecsToRefetch] = useState(59);
  const { dataUpdatedAt } = useRunningSimulation();

  useEffect(() => {
    if (dataUpdatedAt) {
      updateNextRefetchAt(dayjs(dataUpdatedAt).add(59, "seconds").toDate());
      updateSecsToRefetch(59);
    }
  }, [dataUpdatedAt]);

  useEffect(() => {
    if (nextRefetchAt) {
      const interval = setInterval(() => {
        const diff = dayjs(nextRefetchAt).diff(dayjs(), "seconds");

        updateSecsToRefetch(diff);
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }
  }, [nextRefetchAt]);

  return <Text>{secsToRefetch} second(s) to refetch</Text>;
}
