import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const teamDepartments = pgTable("team_departments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  departmentId: integer("department_id").notNull().references(() => teamDepartments.id, { onDelete: "restrict" }),
  name: text("name").notNull(),
  role: text("role").notNull(),
  biography: text("biography").notNull(),
  email: text("email").notNull(),
  photoPath: text("photo_path"),
  grayscale: boolean("grayscale").notNull().default(true),
  isFounder: boolean("is_founder").notNull().default(false),
  isPublished: boolean("is_published").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const teamPhotoUploads = pgTable("team_photo_uploads", {
  objectPath: text("object_path").primaryKey(),
  ownerId: text("owner_id").notNull(),
  validated: boolean("validated").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertTeamDepartmentSchema = createInsertSchema(teamDepartments).omit({ id: true });
export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({ id: true, updatedAt: true, isFounder: true });
export type TeamMemberRecord = typeof teamMembers.$inferSelect;
