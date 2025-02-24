import { Card, CardContent } from "@/components/ui/card";
import { format, startOfMonth, getDay } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Clock, Users } from "lucide-react";
import { useState } from "react";
import type { Reservation } from "@shared/schema";
import { getPrayerTimes } from "@/lib/prayer-times";
import SignupForm from "./signup-form";

interface CalendarGridProps {
  reservations: Reservation[];
}

export default function CalendarGrid({ reservations }: CalendarGridProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Calculate empty cells before March 1st
  const march2025Start = new Date(2025, 2, 1);
  // Convert Sunday=0 to Monday=0 system
  let startDayOfWeek = getDay(march2025Start); // 6 for Saturday
  startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
  const emptyCells = Array(startDayOfWeek).fill(null);

  const days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(2025, 2, i + 1);
    const dateStr = format(date, "yyyy-MM-dd");
    const dateReservations = reservations.filter(r => r.date === dateStr);
    const host = dateReservations.find(r => r.role === "hosting");
    const attendeeCount = dateReservations.filter(r => r.role === "attending")
      .reduce((total, r) => total + r.guestCount, 0);
    const prayerTimes = getPrayerTimes(date);
    return { date, dateStr, host, attendeeCount, prayerTimes };
  });

  return (
    <TooltipProvider>
      <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
        {emptyCells.map((_, i) => (
          <div key={`empty-${i}`} className="h-40" />
        ))}

        {days.map(({ date, dateStr, host, attendeeCount, prayerTimes }) => {
          const dayOfMonth = format(date, "d");
          const hasHost = !!host;

          return (
            <Tooltip key={dateStr}>
              <TooltipTrigger asChild>
                <Card 
                  className={`
                    relative h-40 cursor-pointer transition-all duration-200
                    ${hasHost 
                      ? 'bg-primary/10 border-primary shadow-md' 
                      : 'hover:bg-accent hover:scale-105 hover:shadow-lg'
                    }
                  `}
                  onClick={() => setSelectedDate(dateStr)}
                >
                  <CardContent className="p-3 h-full flex flex-col">
                    <div className="flex justify-between items-start">
                      <div className="text-xs text-muted-foreground">
                        {format(date, 'EEE')}
                      </div>
                      <div className="font-bold text-lg text-primary">
                        {dayOfMonth}
                      </div>
                    </div>

                    {prayerTimes && (
                      <div className="mt-2 text-xs text-muted-foreground space-y-1.5 bg-background/50 p-1.5 rounded-md">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          <span>Suhoor: {prayerTimes.fajr}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          <span>Iftar: {prayerTimes.maghrib}</span>
                        </div>
                      </div>
                    )}

                    <div className="mt-auto space-y-1">
                      {host && (
                        <div className="px-2 py-1 bg-primary/5 rounded text-xs">
                          <p className="font-semibold text-primary truncate">Host: {host.name}</p>
                        </div>
                      )}
                      {attendeeCount > 0 && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground px-2">
                          <Users className="w-3 h-3" />
                          <span>{attendeeCount} attending</span>
                        </div>
                      )}
                      {!host && (
                        <div className="text-center">
                          <span className="text-xs text-muted-foreground">Available for hosting</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              {(host || attendeeCount > 0) && (
                <TooltipContent>
                  <div className="text-sm space-y-1">
                    {host && (
                      <>
                        <p className="font-bold">Host: {host.name}</p>
                        <p className="text-muted-foreground">{host.phone}</p>
                      </>
                    )}
                    {attendeeCount > 0 && (
                      <p className="text-muted-foreground">{attendeeCount} people attending</p>
                    )}
                  </div>
                </TooltipContent>
              )}
            </Tooltip>
          );
        })}
      </div>

      <Dialog open={!!selectedDate} onOpenChange={() => setSelectedDate(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Register for {selectedDate}</DialogTitle>
          </DialogHeader>
          {selectedDate && (
            <SignupForm 
              defaultDate={selectedDate}
              onSuccess={() => setSelectedDate(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}