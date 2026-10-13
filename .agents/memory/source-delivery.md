---
name: Source delivery for Skeletix
description: User expects site code and edits to be available for updating their Git repository.
---

For this site, the user needs the code and its edits as work proceeds, to update their Git repository.

**Why:** The user requested code alongside image-based site updates and repeated that they could not see the changes or code.

**How to apply:** After site edits, identify changed source files and provide an export of the current source and an applicable Git patch when useful. Do not imply that an external repository was updated unless it actually was.

Use the supplied theme artwork as the homepage hero background, not a separate featured image card.

**Why:** The user clarified that the first uploaded image was intended as a background after seeing it displayed as a separate image.

**How to apply:** Preserve the background treatment and readable text overlay when adjusting homepage branding.

Source export checks may hit a platform Git-index permission guard even on read-only Git commands. A successful type check followed by a rejected Git command is not a failed type check.

**Why:** Export commands have triggered the guard after TypeScript had already passed.

**How to apply:** Separate validation results from export-command results. Keep export operations read-only and never stage, commit, or push solely to generate a download.
