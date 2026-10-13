import { readFile } from "node:fs/promises";
import { eq } from "drizzle-orm";
import { db, pool, teamDepartments, teamMembers } from "@workspace/db";
import { savePortrait } from "../lib/teamPhotos";
import { logger } from "../lib/logger";

async function seed() {
  const [existing] = await db.select({ id: teamMembers.id }).from(teamMembers).where(eq(teamMembers.isFounder, true)).limit(1);
  if (existing) {
    logger.info("Founder profile already exists; leaving owner edits unchanged");
    return;
  }
  const [department] = await db.insert(teamDepartments).values({
    name: "Leadership",
    description: "The perspective behind Skeletix and the development of SkeletID.",
    sortOrder: 0,
  }).onConflictDoNothing().returning();
  const leadership = department ?? (await db.select().from(teamDepartments).where(eq(teamDepartments.name, "Leadership")))[0];
  const bytes = await readFile(new URL("../../assets/founder-portrait.jpeg", import.meta.url));
  const photoPath = await savePortrait(bytes, "founder-seed");
  await db.insert(teamMembers).values({
    departmentId: leadership.id,
    name: "Anastasia Slack",
    role: "Founder of Skeletix LLC",
    biography: "Anastasia Slack holds a master's degree in anthropology. Her background in forensic anthropology informs her interest in connecting the work of forensic science.\n\nShe saw a need for a standardized operating system that brings all forensic disciplines into one environment. Through SkeletID, she aims to support connected case records, chain-of-custody tracking, and collaboration within and across local, state, and federal institutions.",
    email: "osteoidhumanid@gmail.com",
    photoPath,
    isFounder: true,
    isPublished: true,
    grayscale: true,
    sortOrder: 0,
  });
  logger.info("Founder profile created");
}

seed().catch((error) => {
  logger.error({ errorType: error instanceof Error ? error.name : "unknown" }, "Founder initialization failed");
  process.exitCode = 1;
}).finally(() => pool.end());
