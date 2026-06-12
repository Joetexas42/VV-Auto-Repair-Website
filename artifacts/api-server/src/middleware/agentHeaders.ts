import type { Request, Response, NextFunction } from "express";

export function agentHeaders(
  _req: Request,
  res: Response,
  next: NextFunction,
): void {
  res.setHeader(
    "Link",
    [
      '</.well-known/api-catalog>; rel="api-catalog"',
      '</auth.md>; rel="service-doc"',
    ].join(", "),
  );
  next();
}
