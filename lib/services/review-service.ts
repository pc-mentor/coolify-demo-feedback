import { z } from "zod";
import { prisma } from "@/lib/db";

export const createReviewSchema = z.object({
  name: z.string().trim().min(1, "Name fehlt").max(80),
  email: z.email("Ungültige E-Mail-Adresse").max(200),
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().max(1000).optional().or(z.literal("")),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;

export async function listReviews() {
  return prisma.review.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createReview(input: CreateReviewInput) {
  return prisma.review.create({
    data: {
      name: input.name,
      email: input.email,
      rating: input.rating,
      comment: input.comment ? input.comment : null,
    },
  });
}
