import { NextRequest, NextResponse } from "next/server";
import { createReviewSchema, createReview, listReviews } from "@/lib/services/review-service";

export async function GET() {
  const reviews = await listReviews();
  return NextResponse.json({ reviews });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = createReviewSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Eingabe ungültig", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const review = await createReview(parsed.data);
  return NextResponse.json({ review }, { status: 201 });
}
