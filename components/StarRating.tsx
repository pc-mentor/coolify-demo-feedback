"use client";

import { useState } from "react";

export function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (rating: number) => void;
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Sternebewertung">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= (hovered || value);
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} Stern${star === 1 ? "" : "e"}`}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="text-3xl leading-none transition-transform hover:scale-110 focus:outline-none"
          >
            <span className={filled ? "text-amber-400" : "text-zinc-300 dark:text-zinc-600"}>
              ★
            </span>
          </button>
        );
      })}
    </div>
  );
}
