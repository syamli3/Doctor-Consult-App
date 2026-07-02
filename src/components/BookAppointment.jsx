import React, { useState } from "react";
import { Check } from "lucide-react";
import { TIME_SLOTS } from "../data/timeSlots";

function Field({ label, children }) {
  return (
    <div className="field">
      <label className="field-label">{label}</label>
      {children}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="confirm-row">
      <span className="confirm-label">{label}</span>
      <span className="confirm-value">{value}</span>
    </div>
  );
}

/**
 * Screen 2: Book Appointment
 * A form (name, doctor, date, time) that validates required
 * fields and shows a confirmation card once submitted.
 */
export default function BookAppointment({ doctors, preselectedDoctor, onDone }) {
  const [form, setForm] = useState({
    name: "",
    doctorId: preselectedDoctor ? preselectedDoctor.id : "",
    date: "",
    time: "",
  });
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");

  const doctor = doctors.find((d) => d.id === form.doctorId);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.doctorId || !form.date || !form.time) {
      setError("Please fill in every field before booking.");
      return;
    }
    setError("");
    setConfirmed(true);
    // In a real app this is where you'd POST to a booking API.
  }

  if (confirmed && doctor) {
    return (
      <div className="screen-padding">
        <div className="confirmation-card">
          <div className="confirmation-check">
            <Check size={24} color="#16433D" strokeWidth={3} />
          </div>
          <div className="confirmation-title">Appointment confirmed</div>
          <div className="confirmation-subtitle">
            A confirmation has been sent to your registered contact.
          </div>

          <div className="confirmation-details">
            <Row label="Patient" value={form.name} />
            <Row label="Doctor" value={`${doctor.name} · ${doctor.specialization}`} />
            <Row label="Date" value={form.date} />
            <Row label="Time" value={form.time} />
          </div>
        </div>

        <button className="btn-outline full-width" onClick={onDone}>
          Back to doctor list
        </button>
      </div>
    );
  }

  return (
    <form className="screen-padding" onSubmit={handleSubmit}>
      <p className="section-label">Book a consultation</p>

      <Field label="Your name">
        <input
          className="text-input"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Full name"
        />
      </Field>

      <Field label="Doctor">
        <select
          className="text-input"
          value={form.doctorId}
          onChange={(e) => update("doctorId", e.target.value)}
        >
          <option value="">Select a doctor</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} — {d.specialization}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Date">
        <input
          className="text-input"
          type="date"
          value={form.date}
          onChange={(e) => update("date", e.target.value)}
        />
      </Field>

      <Field label="Time slot">
        <div className="slot-grid">
          {TIME_SLOTS.map((t) => (
            <button
              type="button"
              key={t}
              className={`slot-btn ${form.time === t ? "slot-btn-active" : ""}`}
              onClick={() => update("time", t)}
            >
              {t}
            </button>
          ))}
        </div>
      </Field>

      {error && <div className="error-text">{error}</div>}

      <button type="submit" className="btn-accent full-width">
        Confirm appointment
      </button>
    </form>
  );
}
