import { apiRequest } from "./client";

export interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
}

export type NewTrip = Omit<Trip, "id">;

export const tripsApi = {
  list: () => apiRequest<Trip[]>("/api/trips"),
  create: (trip: NewTrip) => apiRequest<Trip>("/api/trips", { method: "POST", body: trip }),
  remove: (id: string) =>
    apiRequest<void>(`/api/trips/${encodeURIComponent(id)}`, { method: "DELETE" }),
};
