import { z } from "zod";

/**
 * Match status constants
 */
export const MATCH_STATUS = {
  SCHEDULED: "scheduled",
  LIVE: "live",
  FINISHED: "finished",
};

/**
 * Query schema for listing matches
 * - optional limit
 * - coerced to number
 * - must be positive integer
 * - max 100
 */
export const listMatchesQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(100).optional(),
});

/**
 * Params schema for match ID
 * - required
 * - coerced positive integer
 */
export const matchIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

/**
 * Helper: ISO date validation
 */
/* const isValidISODate = (value) => {
  const date = new Date(value);
  return !isNaN(date.getTime()) && value === date.toISOString();
}; */

const isoDateString = z.iso.datetime();

/**
 * Create match schema
 */
export const createMatchSchema = z
  .object({
    sport: z.string().min(1, "sport is required"),
    homeTeam: z.string().min(1, "homeTeam is required"),
    awayTeam: z.string().min(1, "awayTeam is required"),
    startTime: z.iso.datetime("startTime must be a valid ISO date string"),
    endTime: z.iso.datetime("endTime must be a valid ISO date string"),
    homeScore: z.coerce.number().int().nonnegative().optional(),
    awayScore: z.coerce.number().int().nonnegative().optional(),
  })
  .superRefine((data, ctx) => {
    const start = new Date(data.startTime);
    const end = new Date(data.endTime);

    if (end <= start) {
      ctx.addIssue({
        code: "invalid_type",
        message: "endTime must be after startTime",
        path: ["endTime"],
      });
    }
  });
