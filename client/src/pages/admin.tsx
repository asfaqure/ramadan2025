import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import type { Reservation } from "@shared/schema";

const ADMIN_PASSWORD = "aman1234"; // In a real app, this would be properly secured

export default function Admin() {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  const { data: reservations = [] } = useQuery<Reservation[]>({
    queryKey: ["/api/reservations"],
    enabled: isAuthorized,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/reservations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reservations"] });
    },
  });

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthorized(true);
    }
  };

  const exportToCsv = () => {
    const csv = [
      ["Date", "Name", "Role", "Phone", "Email", "Guests", "Notes"].join(","),
      ...reservations.map(r => 
        [r.date, r.name, r.role, r.phone, r.email || "", r.guestCount, r.notes || ""].join(",")
      )
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "iftar-reservations.csv";
    a.click();
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-bold text-center">Admin Login</h2>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
            />
            <Button className="w-full" onClick={handleLogin}>Login</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Reservations</h2>
            <Button onClick={exportToCsv}>Export to CSV</Button>
          </div>

          <div className="space-y-4">
            {reservations.map((reservation) => (
              <Card key={reservation.id}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-bold">{reservation.date}</p>
                    <p>{reservation.name} ({reservation.role})</p>
                    <p className="text-sm text-muted-foreground">
                      {reservation.phone} - {reservation.guestCount} guests
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => deleteMutation.mutate(reservation.id)}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}