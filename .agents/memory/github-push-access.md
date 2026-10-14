---
name: GitHub push access
description: Verifying Replit's GitHub source-control connection before repository writes.
---

Do not assume that a GitHub connection is usable only because a bind operation reports success or active status. In this workspace, integration discovery still reported `not_added`, the GitHub connection was not returned to `listConnections`, and direct `git ls-remote` requests timed out. A later reconnect attempt also left the entry at `not_added`; `addIntegration` reported it was already active while GitHub rejected Git operations with an invalid-token error. Reauthorization and initial-connect prompts were both rejected because of the inconsistent connection state.

**Why:** The agent could not verify the target repository's files or branch, so it could not safely prepare a commit.

**How to apply:** Before staging or pushing to GitHub, confirm the selected repository can be read through an authenticated path. A successful bind is not proof of a working token. If GitHub still rejects access after reconnection and the Replit flow cannot reauthorize the connection, stop and ask the user to repair the workspace connection and ensure the connected account has repository write access. Do not claim the repository was updated.
