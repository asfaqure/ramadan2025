import { format } from "date-fns";

export interface PrayerTime {
  date: string;
  fajr: string;    // Suhoor ends
  maghrib: string; // Iftar time
}

// March 2025 prayer times for Bergen
export const PRAYER_TIMES: PrayerTime[] = [
  { date: "2025-03-01", fajr: "05:23", maghrib: "18:12" },
  { date: "2025-03-02", fajr: "05:20", maghrib: "18:15" },
  { date: "2025-03-03", fajr: "05:17", maghrib: "18:18" },
  { date: "2025-03-04", fajr: "05:14", maghrib: "18:21" },
  { date: "2025-03-05", fajr: "05:11", maghrib: "18:24" },
  { date: "2025-03-06", fajr: "05:08", maghrib: "18:27" },
  { date: "2025-03-07", fajr: "05:05", maghrib: "18:30" },
  { date: "2025-03-08", fajr: "05:02", maghrib: "18:33" },
  { date: "2025-03-09", fajr: "04:59", maghrib: "18:36" },
  { date: "2025-03-10", fajr: "04:56", maghrib: "18:39" },
  { date: "2025-03-11", fajr: "04:53", maghrib: "18:42" },
  { date: "2025-03-12", fajr: "04:50", maghrib: "18:45" },
  { date: "2025-03-13", fajr: "04:47", maghrib: "18:48" },
  { date: "2025-03-14", fajr: "04:44", maghrib: "18:51" },
  { date: "2025-03-15", fajr: "04:41", maghrib: "18:54" },
  { date: "2025-03-16", fajr: "04:38", maghrib: "18:57" },
  { date: "2025-03-17", fajr: "04:35", maghrib: "19:00" },
  { date: "2025-03-18", fajr: "04:32", maghrib: "19:03" },
  { date: "2025-03-19", fajr: "04:29", maghrib: "19:06" },
  { date: "2025-03-20", fajr: "04:26", maghrib: "19:09" },
  { date: "2025-03-21", fajr: "04:23", maghrib: "19:12" },
  { date: "2025-03-22", fajr: "04:20", maghrib: "19:15" },
  { date: "2025-03-23", fajr: "04:17", maghrib: "19:18" },
  { date: "2025-03-24", fajr: "04:14", maghrib: "19:21" },
  { date: "2025-03-25", fajr: "04:11", maghrib: "19:24" },
  { date: "2025-03-26", fajr: "04:08", maghrib: "19:27" },
  { date: "2025-03-27", fajr: "04:05", maghrib: "19:30" },
  { date: "2025-03-28", fajr: "04:02", maghrib: "19:33" },
  { date: "2025-03-29", fajr: "03:59", maghrib: "19:36" },
  { date: "2025-03-30", fajr: "03:56", maghrib: "19:39" },
];

export function getPrayerTimes(date: Date): PrayerTime | undefined {
  const dateStr = format(date, "yyyy-MM-dd");
  return PRAYER_TIMES.find(pt => pt.date === dateStr);
}
