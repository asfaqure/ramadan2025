import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertReservationSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  app.get("/api/reservations", async (_req, res) => {
    const reservations = await storage.getReservations();
    res.json(reservations);
  });

  app.post("/api/reservations", async (req, res) => {
    const result = insertReservationSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid reservation data" });
    }

    const { role, date } = result.data;

    // Check if there's already a host for this date
    if (role === "hosting") {
      const existingHost = (await storage.getReservationsByDate(date))
        .find(r => r.role === "hosting");

      if (existingHost) {
        return res.status(409).json({ 
          message: "This date already has a host" 
        });
      }
    }

    const reservation = await storage.createReservation(result.data);
    res.status(201).json(reservation);
  });

  app.delete("/api/reservations/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    await storage.deleteReservation(id);
    res.status(204).send();
  });

  return createServer(app);
}