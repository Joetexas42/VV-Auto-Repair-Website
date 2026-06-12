import { Router, type IRouter } from "express";

const router: IRouter = Router();

const API_BASE_URL = process.env["API_BASE_URL"] ?? "";

router.get("/openapi.json", (_req, res) => {
  const spec = {
    openapi: "3.1.0",
    info: {
      title: "VV Auto Repair API",
      version: "0.0.0",
      description:
        "REST API for VV Auto Repair shops in Dallas and Garland, TX. Provides customer reviews, location configuration, contact form submission, and server health status.",
      contact: {
        name: "VV Auto Repair",
        url: API_BASE_URL || undefined,
      },
    },
    servers: [
      {
        url: `${API_BASE_URL}/api`,
        description: "VV Auto API",
      },
    ],
    components: {
      securitySchemes: {
        AdminApiKey: {
          type: "apiKey",
          in: "header",
          name: "x-admin-api-key",
          description:
            "Required only for the admin PATCH /location-config/:locationId endpoint. Contact the VV Auto team to obtain a key.",
        },
      },
      schemas: {
        HealthCheckResponse: {
          type: "object",
          required: ["status"],
          properties: {
            status: {
              type: "string",
              example: "ok",
            },
          },
        },
        PlaceReview: {
          type: "object",
          required: [
            "author_name",
            "rating",
            "text",
            "time",
            "relative_time_description",
          ],
          properties: {
            author_name: { type: "string", example: "Michael T." },
            rating: { type: "number", minimum: 1, maximum: 5, example: 5 },
            text: { type: "string", example: "Great service!" },
            time: {
              type: "integer",
              description: "Unix timestamp of the review",
              example: 1710000000,
            },
            relative_time_description: {
              type: "string",
              example: "a month ago",
            },
            profile_photo_url: {
              type: "string",
              format: "uri",
              nullable: true,
            },
          },
        },
        PlaceData: {
          type: "object",
          required: ["rating", "user_ratings_total", "reviews", "isFallback"],
          properties: {
            rating: { type: "number", minimum: 1, maximum: 5, example: 4.4 },
            user_ratings_total: {
              type: "integer",
              minimum: 0,
              example: 65,
            },
            reviews: {
              type: "array",
              items: { $ref: "#/components/schemas/PlaceReview" },
            },
            isFallback: {
              type: "boolean",
              description:
                "true when static fallback data is returned instead of live Google Places data",
            },
          },
        },
        ReviewsResponseSingle: {
          type: "object",
          required: ["location", "data"],
          properties: {
            location: {
              type: "string",
              enum: ["dallas", "garland"],
            },
            data: { $ref: "#/components/schemas/PlaceData" },
          },
        },
        ReviewsResponseBoth: {
          type: "object",
          required: ["dallas", "garland"],
          properties: {
            dallas: { $ref: "#/components/schemas/PlaceData" },
            garland: { $ref: "#/components/schemas/PlaceData" },
          },
        },
        LocationEntry: {
          type: "object",
          required: ["mapsUrl", "writeReviewUrl"],
          properties: {
            mapsUrl: {
              type: "string",
              format: "uri",
              nullable: true,
              example: "https://maps.google.com/?cid=123456",
            },
            writeReviewUrl: {
              type: "string",
              format: "uri",
              nullable: true,
              example:
                "https://search.google.com/local/writereview?placeid=abc",
            },
          },
        },
        LocationConfigResponse: {
          type: "object",
          required: ["dallas", "garland"],
          properties: {
            dallas: { $ref: "#/components/schemas/LocationEntry" },
            garland: { $ref: "#/components/schemas/LocationEntry" },
          },
        },
        LocationConfigRow: {
          type: "object",
          required: ["locationId", "mapsUrl", "writeReviewUrl", "updatedAt"],
          properties: {
            locationId: {
              type: "string",
              enum: ["dallas", "garland"],
            },
            mapsUrl: {
              type: "string",
              format: "uri",
              nullable: true,
            },
            writeReviewUrl: {
              type: "string",
              format: "uri",
              nullable: true,
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        LocationConfigPatchRequest: {
          type: "object",
          description:
            "At least one of mapsUrl or writeReviewUrl must be provided.",
          minProperties: 1,
          properties: {
            mapsUrl: {
              type: "string",
              format: "uri",
              nullable: true,
              description: "New Google Maps URL for the location",
            },
            writeReviewUrl: {
              type: "string",
              format: "uri",
              nullable: true,
              description: "New Google review-page URL for the location",
            },
          },
        },
        ContactRequest: {
          type: "object",
          required: ["name", "email", "message"],
          properties: {
            name: { type: "string", example: "Jane Smith" },
            email: {
              type: "string",
              format: "email",
              example: "jane@example.com",
            },
            phone: {
              type: "string",
              nullable: true,
              example: "214-555-0100",
            },
            message: {
              type: "string",
              example: "I'd like to schedule an oil change for next week.",
            },
          },
        },
        ContactResponse: {
          type: "object",
          required: ["ok", "delivered"],
          properties: {
            ok: { type: "boolean", example: true },
            delivered: {
              type: "boolean",
              description:
                "true when the email was successfully dispatched; false when email credentials are not configured on the server",
              example: true,
            },
          },
        },
        ErrorResponse: {
          type: "object",
          required: ["error"],
          properties: {
            error: { type: "string", example: "Invalid email address" },
          },
        },
      },
    },
    paths: {
      "/healthz": {
        get: {
          operationId: "getHealthz",
          summary: "Health check",
          description: "Returns server health status.",
          tags: ["System"],
          responses: {
            "200": {
              description: "Server is healthy",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/HealthCheckResponse" },
                  example: { status: "ok" },
                },
              },
            },
          },
        },
      },
      "/reviews": {
        get: {
          operationId: "getReviews",
          summary: "Get Google Places reviews",
          description:
            "Returns Google Places reviews for one or both VV Auto locations. When `location` is omitted, reviews for both Dallas and Garland are returned together.",
          tags: ["Reviews"],
          parameters: [
            {
              name: "location",
              in: "query",
              required: false,
              description:
                "Which shop location to fetch reviews for. Omit to receive both locations.",
              schema: {
                type: "string",
                enum: ["dallas", "garland"],
              },
            },
          ],
          responses: {
            "200": {
              description:
                "Review data for the requested location(s). Shape depends on whether `location` was provided.",
              content: {
                "application/json": {
                  schema: {
                    oneOf: [
                      { $ref: "#/components/schemas/ReviewsResponseSingle" },
                      { $ref: "#/components/schemas/ReviewsResponseBoth" },
                    ],
                  },
                },
              },
            },
            "400": {
              description: "Invalid location value",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                  example: {
                    error: "location must be 'dallas' or 'garland'",
                  },
                },
              },
            },
          },
        },
      },
      "/location-config": {
        get: {
          operationId: "getLocationConfig",
          summary: "Get location configuration",
          description:
            "Returns Google Maps URLs and Google review-page URLs for all VV Auto shop locations.",
          tags: ["Location"],
          responses: {
            "200": {
              description: "Location configuration for all shops",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/LocationConfigResponse",
                  },
                },
              },
            },
          },
        },
      },
      "/location-config/{locationId}": {
        patch: {
          operationId: "patchLocationConfig",
          summary: "Update a location's URLs",
          description:
            "Updates the Google Maps URL and/or review-page URL for a specific shop location. Requires the `x-admin-api-key` header.",
          tags: ["Location"],
          security: [{ AdminApiKey: [] }],
          parameters: [
            {
              name: "locationId",
              in: "path",
              required: true,
              description: "The location to update",
              schema: {
                type: "string",
                enum: ["dallas", "garland"],
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LocationConfigPatchRequest",
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Updated location config row",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/LocationConfigRow" },
                },
              },
            },
            "400": {
              description: "Invalid locationId or missing fields",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "401": {
              description: "Missing or invalid admin API key",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                  example: { error: "Unauthorized" },
                },
              },
            },
            "500": {
              description: "Database error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                  example: { error: "Database error" },
                },
              },
            },
          },
        },
      },
      "/contact": {
        post: {
          operationId: "postContact",
          summary: "Submit a contact / appointment request",
          description:
            "Submits a customer contact or appointment request. Rate-limited to 5 requests per IP per hour.",
          tags: ["Contact"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ContactRequest" },
              },
            },
          },
          responses: {
            "200": {
              description: "Submission accepted",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ContactResponse" },
                },
              },
            },
            "400": {
              description: "Missing or invalid fields",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                  example: { error: "name, email, and message are required" },
                },
              },
            },
            "429": {
              description: "Rate limit exceeded",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                  example: {
                    error:
                      "Too many contact requests. Please try again later.",
                  },
                },
              },
            },
            "500": {
              description: "Email delivery failure",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                  example: {
                    error: "Failed to send email. Please try again.",
                  },
                },
              },
            },
          },
        },
      },
    },
    tags: [
      { name: "System", description: "Server health and status" },
      { name: "Reviews", description: "Customer reviews from Google Places" },
      {
        name: "Location",
        description:
          "Shop location configuration (map links and review-page URLs)",
      },
      {
        name: "Contact",
        description: "Customer contact and appointment requests",
      },
    ],
    externalDocs: {
      description: "Auth & registration guide",
      url: `${API_BASE_URL}/auth.md`,
    },
  };

  res.setHeader("Content-Type", "application/vnd.oai.openapi+json");
  res.json(spec);
});

export default router;
