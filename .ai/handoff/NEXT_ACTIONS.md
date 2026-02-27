# openclaw-ispconfig - Next Actions

## Immediate

- [x] Implement ISPConfig client, guards, tools, plugin entry
- [x] Add live read-only integration tests
- [x] Update docs and AAHP handoff files

## Optional hardening

- [ ] Add schema-level runtime validation per tool params
- [ ] Add mock-based unit tests for write/provision flows
- [ ] Improve `isp_methods_list` with dynamic discovery endpoint if available in future ISPConfig versions
- [ ] Add richer error normalization (`invalid_method`, permission errors, validation errors)

## Release

- [ ] Bump package version
- [ ] Create release tag
- [ ] Publish npm package
- [ ] Publish plugin on clawhub
