import { type Reservation, type InsertReservation } from "@shared/schema";

export interface IStorage {
  getReservations(): Promise<Reservation[]>;
  getReservationsByDate(date: string): Promise<Reservation[]>;
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  deleteReservation(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private reservations: Map<number, Reservation>;
  private currentId: number;

  constructor() {
    this.reservations = new Map();
    this.currentId = 1;
  }

  async getReservations(): Promise<Reservation[]> {
    return Array.from(this.reservations.values());
  }

  async getReservationsByDate(date: string): Promise<Reservation[]> {
    return Array.from(this.reservations.values())
      .filter(reservation => reservation.date === date);
  }

  async createReservation(insertReservation: InsertReservation): Promise<Reservation> {
    const id = this.currentId++;
    const reservation: Reservation = { ...insertReservation, id };
    this.reservations.set(id, reservation);
    return reservation;
  }

  async deleteReservation(id: number): Promise<void> {
    this.reservations.delete(id);
  }
}

export const storage = new MemStorage();