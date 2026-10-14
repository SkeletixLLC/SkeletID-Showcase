---
name: GitHub push access
description: Verifying Replit's GitHub source-control connection before repository writes.
---

Do not assume that a GitHub connection is usable only because a bind operation reports success or active status. In this workspace, integration discovery still reported `not_added`, the GitHub connection was not returned to `listConnections`, and direct `git ls-remote` requests timed out.

**Why:** The agent could not verify the target repository's files or branch, so it could not safely prepare a commit.

**How to apply:** Before staging or pushing to GitHub, confirm the selected repository can be read through an authenticated path. Stop if remote access remains unavailable; do not claim the repository was updated.
