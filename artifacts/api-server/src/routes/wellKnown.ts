import { Router, type IRouter } from "express";
import { createHash } from "crypto";

const router: IRouter = Router();

const API_BASE_URL = process.env["API_BASE_URL"] ?? "";
const SERVER_VERSION = "0.0.0";

function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

const SKILL_DESCRIPTIONS = {
  "get-reviews":
    "GET /api/reviews — Returns Google Places reviews for the Dallas or Garland VV Auto location. Query param: location (dallas|garland).",
  "get-location-config":
    "GET /api/location-config — Returns map URLs and review page URLs for all VV Auto shop locations.",
  "submit-contact":
    "POST /api/contact — Submits a customer contact/appointment request form. Body: name, email, phone, message.",
  "health-check": "GET /api/healthz — Returns server health status.",
} as const;

router.get("/.well-known/api-catalog", (_req, res) => {
  res.setHeader("Content-Type", "application/linkset+json");
  res.json({
    linkset: [
      {
        anchor: `${API_BASE_URL}/api`,
        "service-desc": [
          {
            href: `${API_BASE_URL}/api/openapi.json`,
            type: "application/vnd.oai.openapi+json",
          },
        ],
        "service-doc": [
          {
            href: "https://github.com/vvauto/api-server#readme",
          },
        ],
        status: [
          {
            href: `${API_BASE_URL}/api/healthz`,
          },
        ],
        "api-catalog": [
          {
            href: `${API_BASE_URL}/.well-known/api-catalog`,
          },
        ],
      },
    ],
  });
});

router.get("/.well-known/oauth-protected-resource", (_req, res) => {
  res.json({
    resource: `${API_BASE_URL}/api`,
    authorization_servers: [],
    scopes_supported: [],
    bearer_methods_supported: [],
    resource_documentation: `${API_BASE_URL}/auth.md`,
    resource_signing_alg_values_supported: [],
    resource_encryption_alg_values_supported: [],
    resource_encryption_enc_values_supported: [],
    x_auth_note:
      "Public GET endpoints require no authentication. The admin PATCH /api/location-config/:id endpoint requires an x-admin-api-key request header.",
  });
});

router.get("/.well-known/oauth-authorization-server", (_req, res) => {
  res.json({
    issuer: `${API_BASE_URL}`,
    grant_types_supported: [],
    token_endpoint: null,
    authorization_endpoint: null,
    response_types_supported: [],
    scopes_supported: [],
    x_auth_model: "api-key",
    x_auth_note:
      "VV Auto API does not use OAuth. Public routes require no credentials. The admin route (PATCH /api/location-config/:id) requires an x-admin-api-key header. Contact the VV Auto team to obtain a key.",
    x_admin_credential: {
      header: "x-admin-api-key",
      routes: ["PATCH /api/location-config/:id"],
      obtain: "Contact the VV Auto team to request admin access.",
    },
  });
});

router.get("/auth.md", (_req, res) => {
  res.setHeader("Content-Type", "text/markdown; charset=utf-8");
  res.send(`# VV Auto API — Authentication & Registration Guide

## Overview

The VV Auto API uses a simple API-key model for the single protected endpoint.
All public read endpoints require **no authentication**.

---

## Public Routes (no auth required)

| Method | Path | Description |
|--------|------|-------------|
| GET | \`/api/healthz\` | Server health check |
| GET | \`/api/reviews\` | Google Places reviews (query: \`location=dallas\|garland\`) |
| GET | \`/api/location-config\` | Map and review-page URLs for all shop locations |
| POST | \`/api/contact\` | Submit a customer contact/appointment request |

Call these endpoints directly with no credentials.

---

## Protected Routes (API key required)

| Method | Path | Description |
|--------|------|-------------|
| PATCH | \`/api/location-config/:id\` | Update a location's map URL or review URL |

### Credential type

\`\`\`
x-admin-api-key: <your-key>
\`\`\`

Pass the key as a request header named **\`x-admin-api-key\`**.

### How to obtain a key

Contact the VV Auto team directly to request admin access. This is a private,
operator-only credential — it is not issued programmatically.

---

## Machine-readable metadata

| Resource | URL |
|----------|-----|
| API Catalog (RFC 9727) | \`/.well-known/api-catalog\` |
| OAuth Protected Resource | \`/.well-known/oauth-protected-resource\` |
| OAuth Authorization Server | \`/.well-known/oauth-authorization-server\` |
| MCP Server Card | \`/.well-known/mcp/server-card.json\` |
| Agent Skills Index | \`/.well-known/agent-skills/index.json\` |

---

## Notes for AI agents

- Treat all \`GET\` endpoints as safe and idempotent.
- \`POST /api/contact\` is rate-limited to 5 requests per hour per IP.
- No token refresh or session management is needed — the API key is static.
`);
});

router.get("/.well-known/mcp/server-card.json", (_req, res) => {
  res.json({
    schema_version: "1.0",
    serverInfo: {
      name: "VV Auto API",
      version: SERVER_VERSION,
      description:
        "REST API for VV Auto Repair shops in Dallas and Garland, TX. Provides reviews, location configuration, contact form submission, and health status.",
    },
    transport: {
      type: "http",
      baseUrl: `${API_BASE_URL}/api`,
    },
    capabilities: [
      {
        name: "get-reviews",
        type: "query",
        description:
          "Retrieve Google Places reviews for the Dallas or Garland location.",
        endpoint: "GET /api/reviews",
        parameters: [
          {
            name: "location",
            in: "query",
            required: false,
            schema: { type: "string", enum: ["dallas", "garland"] },
            description:
              "Which shop location to fetch reviews for. Defaults to dallas.",
          },
        ],
      },
      {
        name: "get-location-config",
        type: "query",
        description:
          "Retrieve map URLs and Google review-page URLs for all VV Auto shop locations.",
        endpoint: "GET /api/location-config",
        parameters: [],
      },
      {
        name: "submit-contact",
        type: "action",
        description:
          "Submit a customer contact or appointment request form. Rate-limited to 5 requests per hour.",
        endpoint: "POST /api/contact",
        body: {
          type: "object",
          required: ["name", "email", "message"],
          properties: {
            name: { type: "string" },
            email: { type: "string", format: "email" },
            phone: { type: "string" },
            message: { type: "string" },
          },
        },
      },
      {
        name: "health-check",
        type: "query",
        description: "Check whether the API server is running and healthy.",
        endpoint: "GET /api/healthz",
        parameters: [],
      },
    ],
    auth: {
      public_routes: "All GET endpoints and POST /api/contact require no auth.",
      admin_routes: "PATCH /api/location-config/:id requires x-admin-api-key header.",
      docs: `${API_BASE_URL}/auth.md`,
    },
  });
});

router.get("/.well-known/agent-skills/index.json", (_req, res) => {
  res.json({
    $schema:
      "https://agentskills.org/schema/index/v1.json",
    provider: {
      name: "VV Auto Repair",
      url: `${API_BASE_URL}`,
    },
    skills: [
      {
        name: "get-reviews",
        type: "query",
        description: SKILL_DESCRIPTIONS["get-reviews"],
        url: `${API_BASE_URL}/api/reviews`,
        method: "GET",
        parameters: [
          {
            name: "location",
            in: "query",
            required: false,
            type: "string",
            enum: ["dallas", "garland"],
          },
        ],
        sha256: sha256(SKILL_DESCRIPTIONS["get-reviews"]),
      },
      {
        name: "get-location-config",
        type: "query",
        description: SKILL_DESCRIPTIONS["get-location-config"],
        url: `${API_BASE_URL}/api/location-config`,
        method: "GET",
        parameters: [],
        sha256: sha256(SKILL_DESCRIPTIONS["get-location-config"]),
      },
      {
        name: "submit-contact",
        type: "action",
        description: SKILL_DESCRIPTIONS["submit-contact"],
        url: `${API_BASE_URL}/api/contact`,
        method: "POST",
        body: {
          type: "object",
          required: ["name", "email", "message"],
          properties: {
            name: { type: "string" },
            email: { type: "string", format: "email" },
            phone: { type: "string" },
            message: { type: "string" },
          },
        },
        sha256: sha256(SKILL_DESCRIPTIONS["submit-contact"]),
      },
      {
        name: "health-check",
        type: "query",
        description: SKILL_DESCRIPTIONS["health-check"],
        url: `${API_BASE_URL}/api/healthz`,
        method: "GET",
        parameters: [],
        sha256: sha256(SKILL_DESCRIPTIONS["health-check"]),
      },
    ],
  });
});

export default router;
