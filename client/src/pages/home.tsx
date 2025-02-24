import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import CalendarGrid from "@/components/calendar-grid";
import { useQuery } from "@tanstack/react-query";
import type { Reservation } from "@shared/schema";

export default function Home() {
  const { data: reservations = [] } = useQuery<Reservation[]>({
    queryKey: ["/api/reservations"],
  });

  return (
    <div className="min-h-screen bg-background relative">
      {/* Admin Link */}
      <div className="absolute top-4 right-4 z-10">
        <Link href="/admin">
          <Button variant="outline">Admin</Button>
        </Link>
      </div>

      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
        <div className="absolute inset-0 bg-[url('/islamic-pattern.svg')] bg-repeat opacity-50" />
      </div>

      {/* Mosque Silhouette */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
        <div className="absolute inset-0 bg-[url('/mosque-silhouette.svg')] bg-no-repeat bg-contain bg-right-top" />
      </div>

      <div className="container mx-auto px-4 py-8 relative">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2 font-[Amiri]">رمضان كريم</h1>
          <h2 className="text-2xl text-foreground mb-2">Ramadan and Iftar Calendar</h2>
          <h3 className="text-xl text-foreground mb-4">Landås Mosque</h3>
          <div className="text-muted-foreground space-y-1">
            <p>Erleveien 14-18, Bergen, Norway</p>
            <p>Tel: 40606051</p>
            <p className="text-sm mt-2">Click on a date to register for hosting or attending</p>
          </div>
        </div>

        <Card className="backdrop-blur-sm bg-white/90">
          <CardContent className="p-6">
            <CalendarGrid reservations={reservations} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}