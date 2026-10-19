import { useState, type FormEvent } from "react";
import type { NewTrip } from "../api/trips";

export function NewTripForm({ onCreate }: { onCreate: (trip: NewTrip) => Promise<void> }) {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [saving, setSaving] = useState(false);

  const canSubmit = destination.trim() !== "" && startDate !== "" && endDate !== "" && !saving;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;
    setSaving(true);
    try {
      await onCreate({ destination: destination.trim(), startDate, endDate, travelers });
      setDestination("");
      setStartDate("");
      setEndDate("");
      setTravelers(1);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="card" aria-labelledby="plan-trip-heading" onSubmit={submit}>
      <h2 id="plan-trip-heading">Plan a trip</h2>
      <label>
        Destination
        <input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Lisbon" />
      </label>
      <div className="row">
        <label>
          Start date
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          End date
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <label>
          Travelers
          <input
            type="number"
            min={1}
            max={12}
            value={travelers}
            onChange={(e) => setTravelers(Number(e.target.value))}
          />
        </label>
      </div>
      <button type="submit" disabled={!canSubmit}>
        {saving ? "Adding…" : "Add trip"}
      </button>
    </form>
  );
}
