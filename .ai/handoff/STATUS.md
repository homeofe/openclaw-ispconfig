# STATUS - openclaw-ispconfig

## Current Version: 0.3.0

- **npm:** @elvatis_com/openclaw-ispconfig@0.3.0
- **ClawHub:** openclaw-ispconfig@0.3.0
- **GitHub:** https://github.com/elvatis/openclaw-ispconfig/releases/tag/v0.3.0

## Build Health
- TypeScript strict build: check after release
- 51 tools registered with JSON Schema parameters
- Plugin API uses `execute()` (not `run()`)
- openclaw.plugin.json: version synced
- Live integration tested against isp.elvatis.com

## What Changed in v0.3.0 (2026-03-15)
**Feature:** 20 new tools - update, delete, aliases, forwards.

New tools:
- isp_client_update, isp_client_delete
- isp_site_update, isp_site_delete
- isp_mail_domain_delete
- isp_mail_alias_list, isp_mail_alias_add, isp_mail_alias_delete
- isp_mail_forward_list, isp_mail_forward_add, isp_mail_forward_delete
- isp_dns_zone_delete, isp_dns_record_update
- isp_db_delete, isp_db_user_delete
- isp_ftp_user_delete, isp_shell_user_delete
- isp_cron_delete, isp_cron_update

Other changes:
- Extended dnsMethodForType() to support "update" action
- Added validation schemas for all new tools
- Updated KNOWN_METHODS list
- Updated /ispconfig command with full tool list and examples
- Removed all em dashes from output strings and comments

## Plugin API Contract (IMPORTANT)
OpenClaw expects tools registered via `api.registerTool()` to have:
```ts
api.registerTool({
  name: "tool_name",
  description: "...",
  parameters: { type: "object", properties: { ... }, required: [...] },
  execute: (params) => tool.run(params),  // NOT "run" - must be "execute"
});
```
- `parameters` MUST always be present with at least `{ type: "object", properties: {} }`
- `execute` is the function name, not `run`
- Missing `parameters` causes UI crash on `.properties` access
- Using `run` instead of `execute` causes `tool.execute is not a function`

## Tools (51 total)
- 17 read tools (system_info, client_list, sites_list, dns_zone_list, mail_alias_list, mail_forward_list, etc.)
- 32 write tools (client_add/update/delete, site_add/update/delete, dns_record_add/update/delete, etc.)
- 1 alias (domain_add -> site_add)
- 1 provisioning (provision_site - full stack in one call)

## Architecture
- Session-based ISPConfig JSON API client with auto-reconnect
- Safety guards via `readOnly` and `allowedOperations` config
- Validation layer (src/validate.ts) with per-tool schemas
- Connected to: isp.elvatis.com:8080
