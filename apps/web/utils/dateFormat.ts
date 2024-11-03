export function dateFormat(date?: string | null | Date) {
  if (!date) {
    return null;
  }

  return Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    localeMatcher: "lookup",
    timeZone: "UTC",
  }).format(new Date(date));
}
