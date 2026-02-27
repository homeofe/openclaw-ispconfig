# openclaw-ispconfig - Status

> Last updated: 2026-02-23
> Phase: P4 complete (implementation + live tests)

## Project Overview

**Package:** `@elvatis/openclaw-ispconfig`
**Repo:** https://github.com/homeofe/openclaw-ispconfig
**Purpose:** OpenClaw tools for ISPConfig JSON API (sites, DNS, mail, DB, clients, cron, provisioning).

## Build Health

- Repo / structure: (Verified)
- TypeScript strict build: (Verified)
- openclaw.plugin.json with 31 tools: (Verified)
- ISPConfig API client (`src/client.ts`): (Verified)
- Guards (`src/guards.ts`): (Verified)
- 31 tools (`src/tools.ts`): (Verified)
- Plugin entry + registration (`src/index.ts`): (Verified)
- README with setup + tool docs: (Verified)
- Live integration tests against a private ISPConfig instance: (Verified)

## Notes

- API method is used as query string (`json.php?method_name`), not in body.
- `sites_web_domain_get` returned empty list without filters for this user; implementation includes safe fallback via `primary_id` probing for list-oriented tools.
- `isp_backup_list` currently returns `skipped` because no backup list API method was discovered.
