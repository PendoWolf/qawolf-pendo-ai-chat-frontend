import type { Trip } from "../api/trips";

export function TripList({ trips, onRemove }: { trips: Trip[]; onRemove: (trip: Trip) => void }) {
  if (trips.length === 0) {
    return <p className="empty">No trips yet. Plan one, or ask the assistant for ideas.</p>;
  }
  return (
    <ul className="trips">
      {trips.map((trip) => (
        <li key={trip.id} className="card trip">
          <div>
            <strong>{trip.destination}</strong>
            <span>
              {trip.startDate} → {trip.endDate} · {trip.travelers} traveler{trip.travelers === 1 ? "" : "s"}
            </span>
          </div>
          <button type="button" className="secondary" onClick={() => onRemove(trip)} aria-label={`Remove ${trip.destination}`}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
