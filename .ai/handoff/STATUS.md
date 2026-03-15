# STATUS — openclaw-ispconfig

## Current Version: 0.2.1

- **npm:** @elvatis_com/openclaw-ispconfig@0.2.1
- **ClawHub:** openclaw-ispconfig@0.2.1
- **GitHub:** https://github.com/elvatis/openclaw-ispconfig/releases/tag/v0.2.1

## Build Health
- TypeScript strict build: ✅ (tsc clean)
- 31 tools registered with JSON Schema parameters: ✅
- Plugin API uses `execute()` (not `run()`): ✅
- openclaw.plugin.json: ✅ (version synced)
- Live integration tested against isp.elvatis.com: ✅

## What Changed in v0.2.1 (2026-03-15)
**Bug fix:** Resolved `"Cannot read properties of undefined (reading 'properties')"` UI crash.

1. **Added `parameters` field to `ToolDefinition` interface** (`src/types.ts`)
2. **Added JSON Schema `parameters` to all 31 tools** (`src/tools.ts`)
3. **Fixed `registerViaApi()` to pass `parameters` through** to `api.registerTool()` (`src/index.ts`)
4. **Changed from `run()` to `execute()`** in plugin API registration (`src/index.ts`)
5. **Updated `BoundTool` interface** to include `parameters` (`src/index.ts`)

## Plugin API Contract (IMPORTANT)
OpenClaw expects tools registered via `api.registerTool()` to have:
```ts
api.registerTool({
  name: "tool_name",
  description: "...",
  parameters: { type: "object", properties: { ... }, required: [...] },
  execute: (params) => tool.run(params),  // NOT "run" — must be "execute"
});
```
- `parameters` MUST always be present with at least `{ type: "object", properties: {} }`
- `execute` is the function name, not `run`
- Missing `parameters` → UI crash on `.properties` access
- Using `run` instead of `execute` → `tool.execute is not a function`

## Tools (31 total)
- 15 read tools (system_info, client_list, sites_list, dns_zone_list, etc.)
- 14 write tools (client_add, site_add, dns_record_add, mail_user_add, etc.)
- 1 alias (domain_add → site_add)
- 1 provisioning (provision_site — full stack in one call)

## Architecture
- Session-based ISPConfig JSON API client with auto-reconnect
- Safety guards via `readOnly` and `allowedOperations` config
- Validation layer (`src/validate.ts`) with per-tool schemas
- Connected to: isp.elvatis.com:8080
