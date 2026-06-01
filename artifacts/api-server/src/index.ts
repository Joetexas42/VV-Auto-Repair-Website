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
  await preWarmCaches();

  app.listen(port, (err) => {
    if (err) {
      logger.error({ err }, "Error listening on port");
      process.exit(1);
    }

    logger.info({ port }, "Server listening");
    startRefreshInterval();
  });
}

main().catch((err) => {
  logger.error({ err }, "Startup failed");
  process.exit(1);
});
