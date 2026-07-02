import React from "react";
import RatingBadge from "./RatingBadge";

function initials(name) {
  return name
    .replace("Dr. ", "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

/**
 * Screen 1: Doctor List
 * Displays every doctor's name, specialization and rating,
 * and lets the user jump straight into booking one of them.
 */
export default function DoctorList({ doctors, onBook }) {
  return (
    <div className="screen-padding">
      <p className="section-label">{doctors.length} doctors available near you</p>

      <div className="doctor-list">
        {doctors.map((doc) => (
          <div key={doc.id} className="doctor-card">
            <div className="avatar">{initials(doc.name)}</div>

            <div className="doctor-info">
              <div className="doctor-name">{doc.name}</div>
              <div className="doctor-tags">
                <span className="specialization-tag">{doc.specialization}</span>
                <RatingBadge rating={doc.rating} />
              </div>
              <div className="doctor-meta">
                {doc.experience} experience &middot; ₹{doc.fee} consult fee
              </div>
            </div>

            <button className="btn-primary btn-small" onClick={() => onBook(doc)}>
              Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
