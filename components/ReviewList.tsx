export type Review = {
  id: string;
  name: string;
  email: string;
  rating: number;
  comment: string | null;
  createdAt: string;
};

function Stars({ rating }: { rating: number }) {
  return (
    <span aria-label={`${rating} von 5 Sternen`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? "text-amber-400" : "text-zinc-300 dark:text-zinc-600"}
        >
          ★
        </span>
      ))}
    </span>
  );
}

export function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <p className="text-center text-zinc-500 dark:text-zinc-400">
        Noch keine Bewertungen – sei der/die Erste!
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {reviews.map((review) => (
        <li
          key={review.id}
          className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium">{review.name}</span>
            <Stars rating={review.rating} />
          </div>
          {review.comment && (
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{review.comment}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
