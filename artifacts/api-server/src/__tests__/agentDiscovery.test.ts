import { vi, describe, it, expect, beforeAll } from "vitest";

vi.mock("@workspace/db", () => {
  const mockRows = [
    { locationId: "dallas", mapsUrl: null, writeReviewUrl: null },
    { locationId: "garland", mapsUrl: null, writeReviewUrl: null },
  ];

  const selectChain = {
    from: vi.fn(() => Promise.resolve(mockRows)),
  };

  const insertValues = {
    onConflictDoUpdate: vi.fn(() => Promise.resolve()),
  };
  const insertChain = {
    values: vi.fn(() => insertValues),
  };

  return {
    db: {
      select: vi.fn(() => selectChain),
      insert: vi.fn(() => insertChain),
    },
    pool: { end: vi.fn() },
    locationConfigTable: { locationId: "locationId" },
  };
});

import request from "supertest";
import type { Express } from "express";

let app: Express;

beforeAll(async () => {
  const mod = await import("../app.js");
  app = mod.default;
});

function assertLinkHeader(link: string | undefined): void {
  expect(link, "Link header must be present").toBeDefined();
  expect(link, 'Link header must contain rel="api-catalog"').toContain(
    'rel="api-catalog"',
  );
  expect(link, 'Link header must contain rel="service-doc"').toContain(
    'rel="service-doc"',
  );
}

describe("/.well-known/api-catalog", () => {
  it("returns 200 with Content-Type application/linkset+json", async () => {
    const res = await request(app).get("/.well-known/api-catalog");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/application\/linkset\+json/);
  });

  it("contains a linkset array with at least one entry", async () => {
    const res = await request(app).get("/.well-known/api-catalog");
    expect(res.body).toHaveProperty("linkset");
    expect(Array.isArray(res.body.linkset)).toBe(true);
    expect(res.body.linkset.length).toBeGreaterThan(0);
  });

  it("linkset entry has non-empty service-desc and service-doc arrays", async () => {
    const res = await request(app).get("/.well-known/api-catalog");
    const entry = res.body.linkset[0];
    expect(Array.isArray(entry["service-desc"])).toBe(true);
    expect(entry["service-desc"].length).toBeGreaterThan(0);
    expect(entry["service-desc"][0]).toHaveProperty("href");
    expect(Array.isArray(entry["service-doc"])).toBe(true);
    expect(entry["service-doc"].length).toBeGreaterThan(0);
    expect(entry["service-doc"][0]).toHaveProperty("href");
  });

  it("linkset entry has a non-empty anchor", async () => {
    const res = await request(app).get("/.well-known/api-catalog");
    const entry = res.body.linkset[0];
    expect(typeof entry.anchor).toBe("string");
    expect(entry.anchor.length).toBeGreaterThan(0);
  });
});

describe("/.well-known/oauth-protected-resource", () => {
  it("returns 200", async () => {
    const res = await request(app).get("/.well-known/oauth-protected-resource");
    expect(res.status).toBe(200);
  });

  it("has required OAuth protected resource fields", async () => {
    const res = await request(app).get("/.well-known/oauth-protected-resource");
    expect(res.body).toHaveProperty("resource");
    expect(typeof res.body.resource).toBe("string");
    expect(res.body).toHaveProperty("authorization_servers");
    expect(Array.isArray(res.body.authorization_servers)).toBe(true);
    expect(res.body).toHaveProperty("scopes_supported");
  });
});

describe("/.well-known/oauth-authorization-server", () => {
  it("returns 200", async () => {
    const res = await request(app).get(
      "/.well-known/oauth-authorization-server",
    );
    expect(res.status).toBe(200);
  });

  it("has required OAuth authorization server fields", async () => {
    const res = await request(app).get(
      "/.well-known/oauth-authorization-server",
    );
    expect(res.body).toHaveProperty("issuer");
    expect(typeof res.body.issuer).toBe("string");
    expect(res.body).toHaveProperty("grant_types_supported");
    expect(Array.isArray(res.body.grant_types_supported)).toBe(true);
  });
});

describe("/.well-known/mcp/server-card.json", () => {
  it("returns 200 with JSON content-type", async () => {
    const res = await request(app).get("/.well-known/mcp/server-card.json");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
  });

  it("has required serverInfo fields", async () => {
    const res = await request(app).get("/.well-known/mcp/server-card.json");
    expect(res.body).toHaveProperty("schema_version");
    expect(res.body).toHaveProperty("serverInfo");
    const info = res.body.serverInfo;
    expect(typeof info.name).toBe("string");
    expect(info.name.length).toBeGreaterThan(0);
    expect(typeof info.version).toBe("string");
    expect(typeof info.description).toBe("string");
    expect(info.description.length).toBeGreaterThan(0);
  });

  it("has transport with a type field", async () => {
    const res = await request(app).get("/.well-known/mcp/server-card.json");
    expect(res.body).toHaveProperty("transport");
    expect(typeof res.body.transport.type).toBe("string");
  });

  it("has a non-empty capabilities array", async () => {
    const res = await request(app).get("/.well-known/mcp/server-card.json");
    expect(Array.isArray(res.body.capabilities)).toBe(true);
    expect(res.body.capabilities.length).toBeGreaterThan(0);
  });

  it("each capability has name, type, description, and endpoint", async () => {
    const res = await request(app).get("/.well-known/mcp/server-card.json");
    for (const cap of res.body.capabilities) {
      expect(typeof cap.name).toBe("string");
      expect(cap.name.length).toBeGreaterThan(0);
      expect(typeof cap.type).toBe("string");
      expect(typeof cap.description).toBe("string");
      expect(cap.description.length).toBeGreaterThan(0);
      expect(typeof cap.endpoint).toBe("string");
      expect(cap.endpoint.length).toBeGreaterThan(0);
    }
  });

  it("has auth field with public_routes and admin_routes", async () => {
    const res = await request(app).get("/.well-known/mcp/server-card.json");
    expect(res.body).toHaveProperty("auth");
    expect(typeof res.body.auth.public_routes).toBe("string");
    expect(typeof res.body.auth.admin_routes).toBe("string");
  });
});

describe("/.well-known/agent-skills/index.json", () => {
  it("returns 200 with JSON content-type", async () => {
    const res = await request(app).get(
      "/.well-known/agent-skills/index.json",
    );
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
  });

  it("has provider with name and url", async () => {
    const res = await request(app).get(
      "/.well-known/agent-skills/index.json",
    );
    expect(res.body).toHaveProperty("provider");
    const p = res.body.provider;
    expect(typeof p.name).toBe("string");
    expect(p.name.length).toBeGreaterThan(0);
    expect(typeof p.url).toBe("string");
  });

  it("has a non-empty skills array", async () => {
    const res = await request(app).get(
      "/.well-known/agent-skills/index.json",
    );
    expect(Array.isArray(res.body.skills)).toBe(true);
    expect(res.body.skills.length).toBeGreaterThan(0);
  });

  it("each skill has name, type, description, url, method, and sha256", async () => {
    const res = await request(app).get(
      "/.well-known/agent-skills/index.json",
    );
    for (const skill of res.body.skills) {
      expect(typeof skill.name).toBe("string");
      expect(skill.name.length).toBeGreaterThan(0);
      expect(typeof skill.type).toBe("string");
      expect(typeof skill.description).toBe("string");
      expect(skill.description.length).toBeGreaterThan(0);
      expect(typeof skill.url).toBe("string");
      expect(typeof skill.method).toBe("string");
      expect(typeof skill.sha256).toBe("string");
      expect(skill.sha256.length).toBeGreaterThan(0);
    }
  });
});

describe("Link header — required on all /api/* responses", () => {
  it("GET /api/healthz includes both rel=api-catalog and rel=service-doc", async () => {
    const res = await request(app).get("/api/healthz");
    assertLinkHeader(res.headers["link"]);
  });

  it("GET /api/reviews includes both rel=api-catalog and rel=service-doc", async () => {
    const res = await request(app).get("/api/reviews");
    assertLinkHeader(res.headers["link"]);
  });

  it("GET /api/location-config includes both rel=api-catalog and rel=service-doc", async () => {
    const res = await request(app).get("/api/location-config");
    assertLinkHeader(res.headers["link"]);
  });

  it("POST /api/contact (invalid body) includes both rel=api-catalog and rel=service-doc", async () => {
    const res = await request(app)
      .post("/api/contact")
      .set("Content-Type", "application/json")
      .send({});
    assertLinkHeader(res.headers["link"]);
  });

  it("/.well-known/api-catalog also receives the Link header", async () => {
    const res = await request(app).get("/.well-known/api-catalog");
    assertLinkHeader(res.headers["link"]);
  });
});
