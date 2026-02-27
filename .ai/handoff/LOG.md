# openclaw-ispconfig - Log

## 2026-02-23 - Project Initialization (Akido)

- Created project directory + AAHP structure
- Initialized package.json, tsconfig.json, openclaw.plugin.json
- Defined 15 agent tools mapping to ISPConfig Remote JSON API
- Config schema: apiUrl, username, password, readOnly, allowedOperations, verifySsl
- Git initialized, linked to github.com/homeofe/openclaw-ispconfig

## 2026-02-23 - Full implementation + live validation (Subagent)

- Implemented `src/types.ts` with ISPConfig domain types and tool/plugin interfaces.
- Implemented `src/client.ts`:
  - login/logout
  - `call(method, params)` with automatic `session_id` injection
  - session auto-reconnect on auth/session errors
  - HTTPS SSL verification toggle (`verifySsl`)
  - request timeout handling
- Implemented `src/guards.ts` for `readOnly` + `allowedOperations` enforcement.
- Implemented all 31 tools in `src/tools.ts` with requested method mapping.
- Implemented provisioning workflow `isp_provision_site` (client, site, DNS, optional mail, optional DB, SSL flags).
- Implemented plugin wiring in `src/index.ts`:
  - config validation
  - build toolset
  - register all tools
  - export plugin manifest + register function
- Added Jest config (`jest.config.cjs`) and live integration tests (`tests/integration.test.ts`) covering:
  - login/logout
  - server info
  - site listing with expected domains
  - client details (Elvatis, ID 1)
  - SSL status
  - guards (readOnly blocks writes)
- Updated README in English with setup, config, all 31 tools, provisioning flow, and safety controls.
- Verified: `npm run build` and `npm test` passed against live server.
