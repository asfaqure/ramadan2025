import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

interface PrayerTime {
  date: string;
  fajr: string;
  maghrib: string;
}

const PRAYER_TIMES: PrayerTime[] = [
  { date: "2025-03-01", fajr: "05:23", maghrib: "18:12" },
  // Add more prayer times for March 2025
];

export default function PrayerTimes() {
  const today = new Date().toISOString().split("T")[0];
  const todayTimes = PRAYER_TIMES.find(pt => pt.date === today) || PRAYER_TIMES[0];

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-lg font-bold mb-4">Prayer Times</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Suhoor ends</p>
            <p className="text-lg font-bold">{todayTimes.fajr}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Iftar time</p>
            <p className="text-lg font-bold">{todayTimes.maghrib}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
