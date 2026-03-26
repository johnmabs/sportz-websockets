import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  pgEnum,
  jsonb,
  varchar,
  index,
} from "drizzle-orm/pg-core";

export const matchStatusEnum = pgEnum("match_status", [
  "scheduled",
  "live",
  "finished",
]);

export const matches = pgTable(
  "matches",
  {
    id: serial("id").primaryKey(),
    sport: varchar("sport", { length: 50 }).notNull(),
    homeTeam: varchar("home_team", { length: 100 }).notNull(),
    awayTeam: varchar("away_team", { length: 100 }).notNull(),
    status: matchStatusEnum("status").notNull().default("scheduled"),
    startTime: timestamp("start_time"),
    endTime: timestamp("end_time"),
    homeScore: integer("home_score").notNull().default(0),
    awayScore: integer("away_score").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    statusIdx: index("matches_status_idx").on(table.status),
    startTimeIdx: index("matches_start_time_idx").on(table.startTime),
  }),
);

export const commentary = pgTable(
  "commentary",
  {
    id: serial("id").primaryKey(),
    matchId: integer("match_id")
      .notNull()
      .references(() => matches.id, { onDelete: "cascade" }),
    minute: integer("minute").notNull(), // e.g., 45, 90+2
    sequence: integer("sequence").notNull(), // ensures strict ordering
    period: varchar("period", { length: 20 }), // e.g., 1H, 2H, ET
    eventType: varchar("event_type", { length: 50 }).notNull(), // goal, foul, etc.
    actor: varchar("actor", { length: 100 }), // player name
    team: varchar("team", { length: 100 }), // team name
    message: text("message").notNull(),
    metadata: jsonb("metadata"), // flexible payload (xG, VAR, coordinates, etc.)
    tags: text("tags"), // optional comma-separated or structured string
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    matchIdx: index("commentary_match_idx").on(table.matchId),

    // Critical for real-time ordering
    orderingIdx: index("commentary_ordering_idx").on(
      table.matchId,
      table.minute,
      table.sequence,
    ),
  }),
);
