# openclaw-ispconfig — Next Actions

## P1 — API Discovery + Validation (CURRENT)
- [ ] Connect to live ISPConfig API with test credentials
- [ ] Call `?method=methods` to discover all available endpoints
- [ ] Map API functions to planned tools (validate field names, required params)
- [ ] Document actual API response shapes (not just docs)
- [ ] Write read-only tests: list sites, DNS zones, mail domains, clients

## P2 — Architecture
- [ ] ISPConfig API client class (session management, auto-reconnect, error handling)
- [ ] Tool parameter schemas (validated against real API discovery)
- [ ] Session pooling strategy (reuse session_id across calls, refresh on expiry)
- [ ] Define `isp_provision_site` workflow (all-in-one rollout)

## P3 — Implementation

### Core
- [ ] src/types.ts — ISPConfig types (Client, Site, Domain, DnsZone, DnsRecord, MailDomain, MailUser, Database, ShellUser, FtpUser, CronJob)
- [ ] src/client.ts — JSON API client (login, call, logout, auto-reconnect, error mapping)
- [ ] src/guards.ts — readOnly + allowedOperations enforcement

### Read Tools
- [ ] isp_methods_list — Discover all API functions from server
- [ ] isp_system_info — Server info (version, services, load)
- [ ] isp_client_list / isp_client_get
- [ ] isp_sites_list / isp_site_get
- [ ] isp_domains_list
- [ ] isp_dns_zone_list / isp_dns_record_list
- [ ] isp_mail_domain_list / isp_mail_user_list
- [ ] isp_db_list
- [ ] isp_ssl_status — Let's Encrypt cert status per domain
- [ ] isp_quota_check — Disk/traffic quota per client
- [ ] isp_backup_list — Backup status per site
- [ ] isp_cron_list

### Write Tools
- [ ] isp_client_add
- [ ] isp_site_add / isp_domain_add
- [ ] isp_dns_zone_add / isp_dns_record_add / isp_dns_record_delete
- [ ] isp_mail_domain_add / isp_mail_user_add / isp_mail_user_delete
- [ ] isp_db_add / isp_db_user_add
- [ ] isp_shell_user_add / isp_ftp_user_add
- [ ] isp_cron_add

### Provisioning
- [ ] isp_provision_site — One-command rollout:
  1. Client anlegen (falls nicht existiert)
  2. Website erstellen (Apache/Nginx, PHP, SSL)
  3. DNS-Zone + A/AAAA/MX/SPF/DMARC/CNAME Records
  4. Mail-Domain + Standard-Mailboxen
  5. Datenbank + DB-User
  6. Let's Encrypt aktivieren

### Plugin Entry
- [ ] src/index.ts — registerTool x31, config wiring

## P4 — Tests
- [ ] Live API integration tests (read-only, against real ISPConfig)
- [ ] Mock tests for write operations
- [ ] Guard tests (readOnly, allowedOperations)
- [ ] Provision workflow test (mock all steps)

## P5 — Docs + Publish
- [ ] README.md: Setup, ISPConfig Remote User anlegen, Config, alle Tools dokumentiert
- [ ] npm publish @elvatis/openclaw-ispconfig
- [ ] clawhub publish
- [ ] Blog: "Automate your ISPConfig hosting with AI"
