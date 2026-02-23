# openclaw-ispconfig — Next Actions

## P1 — Research
- [ ] Research: ISPConfig Remote JSON API endpoints + auth flow
- [ ] Research: Session management (login/logout, token reuse)
- [ ] Research: Error handling patterns (invalid session, permission denied)

## P2 — Architecture
- [ ] Define ISPConfig API client class (session management, auto-reconnect)
- [ ] Define tool parameter schemas (what each tool accepts/returns)
- [ ] Decide: session pooling vs per-request login

## P3 — Implementation
- [ ] src/types.ts — ISPConfig types (Site, Domain, DnsZone, DnsRecord, MailDomain, MailUser, Database)
- [ ] src/client.ts — ISPConfig JSON API client (login, call, logout, auto-reconnect)
- [ ] src/tools.ts — All 15 agent tool handlers
- [ ] src/guards.ts — readOnly + allowedOperations enforcement
- [ ] src/index.ts — Plugin entry (registerTool x15)
- [ ] Tests: mock API responses, guard tests

## P4 — Docs + Publish
- [ ] README.md with setup guide, config examples, tool reference
- [ ] npm publish @elvatis/openclaw-ispconfig
- [ ] clawhub publish
- [ ] Blog article: "Managing your ISPConfig server with AI"
