"use client";

import { useCallback, useEffect, useState } from "react";
import { ReviewForm } from "@/components/ReviewForm";
import { ReviewList, type Review } from "@/components/ReviewList";

const POLL_INTERVAL_MS = 4000;

export function FeedbackApp() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/v1/reviews", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      setReviews(data.reviews);
    } catch {
      // Netzwerkfehler beim Polling ignorieren, nächster Versuch folgt automatisch
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    // Datenabruf + Polling gegen die API, kein von Props/State abgeleiteter Zustand
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
    const interval = setInterval(refresh, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [refresh]);

  return (
    <div className="grid w-full max-w-4xl gap-10 md:grid-cols-2">
      <section>
        <h2 className="mb-4 text-lg font-semibold">Deine Bewertung</h2>
        <ReviewForm onSubmitted={refresh} />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">
          Bewertungen {loaded && reviews.length > 0 ? `(${reviews.length})` : ""}
        </h2>
        {loaded ? (
          <ReviewList reviews={reviews} />
        ) : (
          <p className="text-zinc-500 dark:text-zinc-400">Lädt…</p>
        )}
      </section>
    </div>
  );
}
