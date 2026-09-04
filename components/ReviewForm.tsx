"use client";

import { useState } from "react";
import { StarRating } from "@/components/StarRating";

export function ReviewForm({ onSubmitted }: { onSubmitted: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (rating === 0) {
      setStatus("error");
      setErrorMessage("Bitte eine Sternebewertung auswählen.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/v1/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, rating, comment }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Da ist etwas schiefgelaufen.");
      }

      setStatus("done");
      setName("");
      setEmail("");
      setRating(0);
      setComment("");
      onSubmitted();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Da ist etwas schiefgelaufen.");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center dark:border-emerald-900 dark:bg-emerald-950">
        <p className="text-lg font-medium text-emerald-800 dark:text-emerald-200">
          Danke für dein Feedback! 🎉
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-3 text-sm underline text-emerald-700 dark:text-emerald-300"
        >
          Noch eine Bewertung abgeben
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          required
          maxLength={80}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium">
          E-Mail
        </label>
        <input
          id="email"
          type="email"
          required
          maxLength={200}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">Bewertung</span>
        <StarRating value={rating} onChange={setRating} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="comment" className="text-sm font-medium">
          Kommentar (optional)
        </label>
        <textarea
          id="comment"
          maxLength={1000}
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-foreground px-5 py-2.5 font-medium text-background transition-colors hover:bg-[#383838] disabled:opacity-50 dark:hover:bg-[#ccc]"
      >
        {status === "submitting" ? "Wird gespeichert…" : "Bewertung abschicken"}
      </button>
    </form>
  );
}
