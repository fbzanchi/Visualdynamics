import { useEffect, useState } from "react";
import { Text } from "@mantine/core";
import dayjs from "dayjs";

import { useRunningSimulation } from "@/hooks/simulation/useRunningSimulation";

export function RefetchTime() {
  const [nextRefetchAt, updateNextRefetchAt] = useState<Date>();
  const [secsToRefetch, updateSecsToRefetch] = useState(0);
  const { data, dataUpdatedAt, isError, refetch } = useRunningSimulation();

  useEffect(() => {
    if (secsToRefetch === 0) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secsToRefetch]);

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

        if (diff >= 0) {
          updateSecsToRefetch(diff);
        }
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }
  }, [nextRefetchAt]);

  if (isError) {
    return <Text>Retrying in {secsToRefetch} second(s)</Text>;
  }

  if (!data || data === "unauthenticated") {
    return null;
  }

  if (data === "not-running") {
    return (
      <Text>
        Your simulation might be starting. We&apos;ll check again in{" "}
        {secsToRefetch} second(s)
      </Text>
    );
  }

  if (data === "queued") {
    return <Text>We&apos;ll check again in {secsToRefetch} second(s)</Text>;
  }

  return <Text>{secsToRefetch} second(s) to refetch</Text>;
}
