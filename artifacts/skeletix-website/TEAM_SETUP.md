# Team directory and owner access

## Where to go

- Public directory: `/team`
- Private editor: `/team/manage`
- Owner sign-in: `/sign-in`

Use the Team page's editor-access link to reach sign-in. If you do not yet have an account, use the account-creation link on that screen. Register with the email configured as `TEAM_OWNER_EMAIL`, verify it, and keep it as your account's primary email. Only that verified account can edit the directory. Registration by anyone else does not grant access.

Choose a new, unique password in the authentication screen and keep it in a password manager. Do not add passwords to website files, employee profiles, setup notes, or environment variables. The authentication provider manages password verification and recovery. The website has no password-display feature.

## Managing profiles

1. Create a department, with an optional description and display order.
2. Select **Add profile**, or edit an existing profile.
3. Enter the approved name, role, biography, contact email, and department.
4. Upload a JPEG, PNG, or WebP portrait, no larger than 8 MB. Check the black-and-white option if desired.
5. Leave **Publish this profile publicly** unchecked while preparing a draft.
6. Confirm the employee's approval before publishing their personal information. Save the profile to apply the publication setting.

The founder appears first, and the founder's department appears first. Other departments and profiles follow their numeric display order, with lower numbers appearing earlier. These are company departments for the team building SkeletID, not a directory of forensic disciplines. The founder label is server-managed, not a public registration role.

Saving validates the image and creates an immutable JPEG portrait without the original metadata. Original uploads and draft portraits are not public. Only a published profile makes its processed portrait available to anonymous visitors. Unpublishing or deleting removes future public access through the photo endpoint. Open directory pages refresh their data periodically; previously downloaded copies cannot be retracted.

Deletion requires confirmation. A department cannot be deleted while any profiles, including hidden ones, remain assigned to it. Move or delete those profiles first. Deleting a profile removes its listing, not its retained storage objects; a storage-retention and cleanup policy still needs to be established.

## Server configuration

The API uses managed `DATABASE_URL`, Clerk server credentials, and App Storage configuration. `TEAM_OWNER_EMAIL` is a server-only allowlist. The optional `TEAM_OWNER_USER_ID` adds an account-ID check. Never derive owner access from a public employee profile, submitted request body, or the first account to register.

The browser uses Clerk cookies. It does not send manually obtained access tokens or receive database credentials. Owner checks run on every private API request. This is a website editor, not a SkeletID product account.

Read `DEPLOYMENT.md` before moving the source to another host. This feature is not supported by static frontend hosting alone.
