# DNS-AID Discovery Records for VV Auto API

This file documents the exact DNS records to publish for DNS-AID agent
discovery (draft-agentdiscovery-aid). These records cannot be applied from the
codebase — they must be entered manually in your DNS provider's zone editor.

> **Zone:** `vvauto.com` (replace with your actual domain)
> **API origin:** `api.vvauto.com` (replace with your actual API hostname)

---

## SVCB / HTTPS Records

DNS-AID uses SVCB (or its HTTPS alias) records to advertise that a domain
hosts an agent-ready API, and to point resolvers at the well-known discovery
endpoints.

### Record 1 — Advertise the API service on the apex domain

| Field | Value |
|-------|-------|
| Type | `HTTPS` |
| Name | `_agent.api.vvauto.com` |
| TTL | `300` |
| Priority | `1` |
| Target | `api.vvauto.com` |
| SvcParams | `alpn="h2,http/1.1" port=443 ech=... path="/.well-known/api-catalog"` |

> Remove the `ech=...` param if you are not deploying Encrypted ClientHello.
> The `path` param tells agents where to find the RFC 9727 API catalog.

### Record 2 — MCP Server Card pointer

| Field | Value |
|-------|-------|
| Type | `HTTPS` |
| Name | `_mcp.api.vvauto.com` |
| TTL | `300` |
| Priority | `1` |
| Target | `api.vvauto.com` |
| SvcParams | `alpn="h2,http/1.1" port=443 path="/.well-known/mcp/server-card.json"` |

### Record 3 — Agent Skills pointer

| Field | Value |
|-------|-------|
| Type | `HTTPS` |
| Name | `_skills.api.vvauto.com` |
| TTL | `300` |
| Priority | `1` |
| Target | `api.vvauto.com` |
| SvcParams | `alpn="h2,http/1.1" port=443 path="/.well-known/agent-skills/index.json"` |

---

## TXT Records (fallback / legacy resolvers)

Some agent resolvers that don't support SVCB fall back to TXT records:

| Field | Value |
|-------|-------|
| Type | `TXT` |
| Name | `_agent.api.vvauto.com` |
| TTL | `300` |
| Value | `"aid=1 catalog=https://api.vvauto.com/.well-known/api-catalog"` |

---

## Verification

After publishing records, verify them with:

```bash
# HTTPS/SVCB
dig HTTPS _agent.api.vvauto.com

# TXT fallback
dig TXT _agent.api.vvauto.com
```

Expected HTTPS answer section:
```
_agent.api.vvauto.com. 300 IN HTTPS 1 api.vvauto.com alpn="h2,http/1.1" port=443 path="/.well-known/api-catalog"
```

---

## References

- [draft-agentdiscovery-aid](https://datatracker.ietf.org/doc/draft-agentdiscovery-aid/)
- [RFC 9460 — SVCB and HTTPS DNS Record Types](https://www.rfc-editor.org/rfc/rfc9460)
- [RFC 9727 — API Catalog](https://www.rfc-editor.org/rfc/rfc9727)
