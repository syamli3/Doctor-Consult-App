import React, { useState } from "react";
import { Stethoscope, CalendarCheck2, ChevronLeft } from "lucide-react";
import DoctorList from "./components/DoctorList";
import BookAppointment from "./components/BookAppointment";
import doctors from "./data/doctors.json";
import "./index.css";

function TabButton({ icon, label, active, onClick }) {
  return (
    <button className={`tab-btn ${active ? "tab-btn-active" : ""}`} onClick={onClick}>
      {icon} {label}
    </button>
  );
}

export default function App() {
  const [screen, setScreen] = useState("list"); // "list" | "book"
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  function goBook(doctor) {
    setSelectedDoctor(doctor || null);
    setScreen("book");
  }

  return (
    <div className="app-shell">
      <div className="phone-frame">
        <div className="header">
          {screen === "book" && (
            <button className="back-btn" onClick={() => setScreen("list")}>
              <ChevronLeft size={22} color="#16433D" />
            </button>
          )}
          <div>
            <div className="app-title">MediBook</div>
            <div className="app-subtitle">Doctor consultations, simplified</div>
          </div>
        </div>

        <div className="tab-switcher">
          <TabButton
            icon={<Stethoscope size={14} />}
            label="Doctors"
            active={screen === "list"}
            onClick={() => setScreen("list")}
          />
          <TabButton
            icon={<CalendarCheck2 size={14} />}
            label="Book"
            active={screen === "book"}
            onClick={() => goBook(selectedDoctor)}
          />
        </div>

        {screen === "list" ? (
          <DoctorList doctors={doctors} onBook={goBook} />
        ) : (
          <BookAppointment
            doctors={doctors}
            preselectedDoctor={selectedDoctor}
            onDone={() => setScreen("list")}
          />
        )}
      </div>
    </div>
  );
}
