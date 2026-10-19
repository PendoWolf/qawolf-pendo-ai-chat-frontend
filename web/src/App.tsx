import { useEffect, useState } from "react";
import { tripsApi, type NewTrip, type Trip } from "./api/trips";
import { NewTripForm } from "./components/NewTripForm";
import { TripList } from "./components/TripList";
import { AssistantPanel } from "./components/AssistantPanel";

export default function App() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [assistantOpen, setAssistantOpen] = useState(false);

  useEffect(() => {
    tripsApi
      .list()
      .then(setTrips)
      .catch((e: Error) => setError(e.message));
  }, []);

  const createTrip = async (trip: NewTrip) => {
    try {
      setError(null);
      const created = await tripsApi.create(trip);
      setTrips((current) => [created, ...current]);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const removeTrip = async (trip: Trip) => {
    try {
      setError(null);
      await tripsApi.remove(trip.id);
      setTrips((current) => current.filter((t) => t.id !== trip.id));
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <div className={assistantOpen ? "layout with-assistant" : "layout"}>
      <main>
        <header className="top">
          <div>
            <h1>Tripwise</h1>
            <p>Plan trips, keep them in one place, and ask the AI assistant for ideas.</p>
          </div>
          {!assistantOpen && (
            <button type="button" onClick={() => setAssistantOpen(true)}>
              Ask the assistant
            </button>
          )}
        </header>

        <NewTripForm onCreate={createTrip} />

        <section aria-labelledby="trips-heading">
          <h2 id="trips-heading">Your trips</h2>
          <TripList trips={trips} onRemove={removeTrip} />
        </section>

        {error && <p className="error">{error}</p>}
      </main>

      {assistantOpen && <AssistantPanel onClose={() => setAssistantOpen(false)} />}
    </div>
  );
}
