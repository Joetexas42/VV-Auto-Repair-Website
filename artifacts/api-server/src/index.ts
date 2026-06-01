import app from "./app";
import { logger } from "./lib/logger";
import { preWarmCaches, startRefreshInterval } from "./services/googlePlaces";
import { validateLocationConfigEnv } from "./routes/locationConfig";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

async function main() {
  validateLocationConfigEnv();

  await new Promise<void>((resolve, reject) => {
    app.listen(port, (err) => {
      if (err) {
        logger.error({ err }, "Error listening on port");
        reject(err);
        return;
      }
      logger.info({ port }, "Server listening");
      resolve();
    });
  });

  // Warm caches after the server is already accepting requests so the
  // startup health probe is not blocked by external API calls.
  preWarmCaches()
    .then(() => startRefreshInterval())
    .catch((err) => logger.error({ err }, "Cache pre-warm failed"));
}

main().catch((err) => {
  logger.error({ err }, "Startup failed");
  process.exit(1);
});
