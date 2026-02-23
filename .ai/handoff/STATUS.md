# openclaw-ispconfig — Status

> Last updated: 2026-02-23
> Phase: P0 — Project initialized, ready for implementation

## Project Overview

**Package:** `@elvatis/openclaw-ispconfig`
**Repo:** https://github.com/homeofe/openclaw-ispconfig
**Purpose:** ISPConfig server management as OpenClaw agent tools — domains, mailboxes, DNS, databases, websites, system info.

## Build Health

| Component            | Status     | Notes                              |
| -------------------- | ---------- | ---------------------------------- |
| Repo / Structure     | (Verified) | Initialized 2026-02-23             |
| package.json         | (Verified) | @elvatis/openclaw-ispconfig v0.1.0 |
| tsconfig.json        | (Verified) | TypeScript strict                  |
| openclaw.plugin.json | (Verified) | 15 tools defined, config schema    |
| ISPConfig API Client | (Unknown)  | Not yet implemented                |
| Agent Tools          | (Unknown)  | Not yet implemented                |
| Tests                | (Unknown)  | Not yet created                    |
| npm publish          | (Unknown)  | Not yet published                  |

## Architecture Decisions

- **API:** ISPConfig Remote JSON API (SOAP deprecated, JSON preferred)
- **Auth:** Session-based (login → session_id → use → logout)
- **Connection:** HTTPS to ISPConfig panel port (default 8080)
- **Safety:** readOnly mode + allowedOperations whitelist
- **Tools:** 15 agent tools covering sites, domains, DNS, mail, databases, system

## ISPConfig Remote API Reference

- Login: `login(username, password)` → session_id
- All calls: `function_name(session_id, params...)` → result
- Logout: `logout(session_id)`
- Docs: https://www.ispconfig.org/documentation/

## Key Tool Mapping

| Tool               | ISPConfig Function          | Type  |
| ------------------ | --------------------------- | ----- |
| isp_sites_list     | sites_web_domain_get        | read  |
| isp_site_get       | sites_web_domain_get (by id)| read  |
| isp_domains_list   | domains_get_all_by_user     | read  |
| isp_domain_add     | domains_domain_add          | write |
| isp_dns_zone_list  | dns_zone_get_by_user        | read  |
| isp_dns_record_list| dns_rr_get_all_by_zone      | read  |
| isp_dns_record_add | dns_rr_add                  | write |
| isp_dns_record_delete| dns_rr_delete              | write |
| isp_mail_domain_list| mail_domain_get_by_user    | read  |
| isp_mail_user_list | mail_user_get_by_email      | read  |
| isp_mail_user_add  | mail_user_add               | write |
| isp_mail_user_delete| mail_user_delete           | write |
| isp_db_list        | sites_database_get_all      | read  |
| isp_db_add         | sites_database_add          | write |
| isp_system_info    | server_get_all              | read  |
