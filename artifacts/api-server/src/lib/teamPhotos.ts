import { randomUUID } from "node:crypto";
import sharp from "sharp";
import { eq } from "drizzle-orm";
import { db, teamPhotoUploads } from "@workspace/db";
import { ObjectStorageService, objectStorageClient } from "./objectStorage";

export const teamStorage = new ObjectStorageService();
export const MAX_PHOTO_SIZE = 8 * 1024 * 1024;
export const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const validPhotoPath = /^\/objects\/(?:uploads|portraits)\/[a-zA-Z0-9-]+$/;

export async function savePortrait(bytes: Buffer, ownerId: string): Promise<string> {
  const jpeg = await sharp(bytes, { limitInputPixels: 40000000 })
    .rotate().resize({ width: 1400, height: 1600, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 88 }).toBuffer();
  const dir = teamStorage.getPrivateObjectDir().replace(/\/$/, "");
  const fullPath = `${dir}/portraits/${randomUUID()}`;
  const parts = fullPath.replace(/^\//, "").split("/");
  const bucket = parts.shift()!;
  await objectStorageClient.bucket(bucket).file(parts.join("/")).save(jpeg, {
    resumable: false, metadata: { contentType: "image/jpeg" },
  });
  const objectPath = `/objects/portraits/${fullPath.split("/").at(-1)}`;
  await db.insert(teamPhotoUploads).values({ objectPath, ownerId, validated: true });
  return objectPath;
}

export async function validateTeamPhoto(path: string | null, ownerId: string): Promise<string | null> {
  if (path === null) return null;
  if (!validPhotoPath.test(path)) throw new Error("Select an uploaded team portrait.");
  const [upload] = await db.select().from(teamPhotoUploads).where(eq(teamPhotoUploads.objectPath, path));
  if (!upload || (upload.ownerId !== ownerId && upload.ownerId !== "founder-seed")) {
    throw new Error("This photo is not available for this profile.");
  }
  if (upload.validated && path.startsWith("/objects/portraits/")) return path;
  const file = await teamStorage.getObjectEntityFile(path);
  const [meta] = await file.getMetadata();
  if (Number(meta.size) > MAX_PHOTO_SIZE || !PHOTO_TYPES.includes(meta.contentType ?? "")) {
    throw new Error("Use a JPEG, PNG, or WebP photo no larger than 8 MB.");
  }
  const [bytes] = await file.download();
  const image = await sharp(bytes, { limitInputPixels: 40000000 }).metadata();
  if (!["jpeg", "png", "webp"].includes(image.format ?? "") || !image.width || !image.height) {
    throw new Error("The uploaded file is not a supported image.");
  }
  // Immutable JPEG derivative strips metadata and cannot be overwritten by the original signed upload URL.
  return savePortrait(bytes, ownerId);
}
