import React from "react";
import { Star } from "lucide-react";

/** Small pill showing a doctor's star rating. */
export default function RatingBadge({ rating }) {
  return (
    <span className="rating-badge">
      <Star size={12} fill="#D9A441" color="#D9A441" />
      {rating.toFixed(1)}
    </span>
  );
}
