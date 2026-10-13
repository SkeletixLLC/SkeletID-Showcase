import { Router, type IRouter } from "express";
import { getAuth } from "@clerk/express";
import { and, asc, desc, eq } from "drizzle-orm";
import { db, teamDepartments, teamMembers, teamPhotoUploads, type TeamMemberRecord } from "@workspace/db";
import {
  CreateTeamDepartmentBody, CreateTeamMemberBody, UpdateTeamDepartmentBody, UpdateTeamMemberBody,
  RequestTeamPhotoUploadBody, GetPublicTeamResponse, GetAdminTeamResponse,
} from "@workspace/api-zod";
import { isTeamOwner, requireTeamOwner } from "../middlewares/teamOwner";
import { teamStorage, validateTeamPhoto } from "../lib/teamPhotos";

const router: IRouter = Router();
const idOf = (value: unknown) => {
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
};
const memberView = ({ updatedAt: _updatedAt, ...member }: TeamMemberRecord) => ({
  ...member,
  photoUrl: member.photoPath ? `/api/team/photos/${member.photoPath.split("/").at(-1)}` : null,
});
const directory = async (admin: boolean) => {
  const departments = await db.select().from(teamDepartments).orderBy(asc(teamDepartments.sortOrder), asc(teamDepartments.id));
  const members = await db.select().from(teamMembers)
    .where(admin ? undefined : eq(teamMembers.isPublished, true))
    .orderBy(desc(teamMembers.isFounder), asc(teamMembers.sortOrder), asc(teamMembers.id));
  return {
    departments: admin ? departments : departments.filter((department) => members.some((member) => member.departmentId === department.id)),
    members: members.map(memberView),
  };
};

router.get("/team", async (_req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.json(GetPublicTeamResponse.parse(await directory(false)));
});
router.get("/team/session", async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  try {
    res.json({ signedIn: Boolean(getAuth(req).userId), isOwner: await isTeamOwner(req) });
  } catch {
    res.status(503).json({ error: "Owner access could not be verified." });
  }
});
router.get("/team/admin", requireTeamOwner, async (_req, res) => {
  res.json(GetAdminTeamResponse.parse(await directory(true)));
});

router.post("/team/departments", requireTeamOwner, async (req, res) => {
  const input = CreateTeamDepartmentBody.safeParse(req.body);
  if (!input.success || !input.data.name.trim()) { res.status(400).json({ error: "Enter a department name and valid display order." }); return; }
  try {
    const [department] = await db.insert(teamDepartments).values({ ...input.data, name: input.data.name.trim(), description: input.data.description.trim() }).returning();
    res.status(201).json(department);
  } catch (error) {
    if ((error as { cause?: { code?: string }; code?: string }).cause?.code === "23505" || (error as { code?: string }).code === "23505") {
      res.status(409).json({ error: "A department with that name already exists." }); return;
    }
    throw error;
  }
});
router.put("/team/departments/:id", requireTeamOwner, async (req, res) => {
  const id = idOf(req.params.id);
  const input = UpdateTeamDepartmentBody.safeParse(req.body);
  if (!id || !input.success || !input.data.name.trim()) { res.status(400).json({ error: "Enter a valid department name and display order." }); return; }
  try {
    const [department] = await db.update(teamDepartments).set({ ...input.data, name: input.data.name.trim(), description: input.data.description.trim() }).where(eq(teamDepartments.id, id)).returning();
    if (!department) { res.status(404).json({ error: "Department not found." }); return; }
    res.json(department);
  } catch (error) {
    if ((error as { cause?: { code?: string }; code?: string }).cause?.code === "23505" || (error as { code?: string }).code === "23505") {
      res.status(409).json({ error: "A department with that name already exists." }); return;
    }
    throw error;
  }
});
router.delete("/team/departments/:id", requireTeamOwner, async (req, res) => {
  const id = idOf(req.params.id);
  if (!id) { res.status(400).json({ error: "Invalid department." }); return; }
  const [member] = await db.select({ id: teamMembers.id }).from(teamMembers).where(eq(teamMembers.departmentId, id)).limit(1);
  if (member) { res.status(409).json({ error: "Move or remove this department's profiles before deleting it." }); return; }
  const deleted = await db.delete(teamDepartments).where(eq(teamDepartments.id, id)).returning({ id: teamDepartments.id });
  if (!deleted.length) { res.status(404).json({ error: "Department not found." }); return; }
  res.status(204).end();
});

router.post("/team/members", requireTeamOwner, async (req, res) => {
  const input = CreateTeamMemberBody.safeParse(req.body);
  if (!input.success || !input.data.name.trim() || !input.data.role.trim() || !input.data.biography.trim()) {
    res.status(400).json({ error: "Enter a name, role, biography, valid email, and department." }); return;
  }
  const [department] = await db.select({ id: teamDepartments.id }).from(teamDepartments).where(eq(teamDepartments.id, input.data.departmentId));
  if (!department) { res.status(400).json({ error: "Select an existing department." }); return; }
  let photoPath: string | null;
  try { photoPath = await validateTeamPhoto(input.data.photoPath, getAuth(req).userId!); }
  catch { res.status(400).json({ error: "The photo could not be validated. Upload a JPEG, PNG, or WebP image up to 8 MB." }); return; }
  const [member] = await db.insert(teamMembers).values({ ...input.data, name: input.data.name.trim(), role: input.data.role.trim(), biography: input.data.biography.trim(), email: input.data.email.trim(), photoPath }).returning();
  res.status(201).json(memberView(member));
});
router.put("/team/members/:id", requireTeamOwner, async (req, res) => {
  const id = idOf(req.params.id);
  const input = UpdateTeamMemberBody.safeParse(req.body);
  if (!id || !input.success || !input.data.name.trim() || !input.data.role.trim() || !input.data.biography.trim()) {
    res.status(400).json({ error: "Enter a name, role, biography, valid email, and department." }); return;
  }
  const [existing] = await db.select({ id: teamMembers.id }).from(teamMembers).where(eq(teamMembers.id, id));
  if (!existing) { res.status(404).json({ error: "Profile not found." }); return; }
  const [department] = await db.select({ id: teamDepartments.id }).from(teamDepartments).where(eq(teamDepartments.id, input.data.departmentId));
  if (!department) { res.status(400).json({ error: "Select an existing department." }); return; }
  let photoPath: string | null;
  try { photoPath = await validateTeamPhoto(input.data.photoPath, getAuth(req).userId!); }
  catch { res.status(400).json({ error: "The photo could not be validated. Upload a JPEG, PNG, or WebP image up to 8 MB." }); return; }
  const [member] = await db.update(teamMembers).set({ ...input.data, name: input.data.name.trim(), role: input.data.role.trim(), biography: input.data.biography.trim(), email: input.data.email.trim(), photoPath }).where(eq(teamMembers.id, id)).returning();
  res.json(memberView(member));
});
router.delete("/team/members/:id", requireTeamOwner, async (req, res) => {
  const id = idOf(req.params.id);
  if (!id) { res.status(400).json({ error: "Invalid profile." }); return; }
  const deleted = await db.delete(teamMembers).where(eq(teamMembers.id, id)).returning({ id: teamMembers.id });
  if (!deleted.length) { res.status(404).json({ error: "Profile not found." }); return; }
  res.status(204).end();
});

router.post("/team/uploads", requireTeamOwner, async (req, res) => {
  const input = RequestTeamPhotoUploadBody.safeParse(req.body);
  if (!input.success) { res.status(400).json({ error: "Choose a JPEG, PNG, or WebP image up to 8 MB." }); return; }
  const uploadURL = await teamStorage.getObjectEntityUploadURL();
  const objectPath = teamStorage.normalizeObjectEntityPath(uploadURL);
  await db.insert(teamPhotoUploads).values({ objectPath, ownerId: getAuth(req).userId! });
  res.json({ uploadURL, objectPath });
});
router.get("/team/photos/:photoId", async (req, res) => {
  const id = String(req.params.photoId);
  if (!/^[a-zA-Z0-9-]+$/.test(id)) { res.status(404).end(); return; }
  const path = `/objects/portraits/${id}`;
  let [member] = await db.select({ id: teamMembers.id }).from(teamMembers)
    .where(and(eq(teamMembers.photoPath, path), eq(teamMembers.isPublished, true))).limit(1);
  if (!member && getAuth(req).userId && await isTeamOwner(req)) {
    [member] = await db.select({ id: teamMembers.id }).from(teamMembers).where(eq(teamMembers.photoPath, path)).limit(1);
  }
  if (!member) { res.status(404).end(); return; }
  try {
    const file = await teamStorage.getObjectEntityFile(path);
    const [bytes] = await file.download();
    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("X-Content-Type-Options", "nosniff");
    // No cache: unpublishing a profile also revokes future public photo access.
    res.setHeader("Cache-Control", "no-store");
    res.send(bytes);
  } catch {
    req.log.warn("Team portrait could not be read");
    res.status(404).end();
  }
});
export default router;
