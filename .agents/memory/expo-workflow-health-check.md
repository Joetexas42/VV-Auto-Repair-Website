---
name: Expo workflow health check behavior
description: restart_workflow always fails with DIDNT_OPEN_A_PORT for Expo artifacts using router="expo-domain", even though Metro starts correctly and port opens in ~5 seconds.
---

# Expo Workflow Health Check

## The Rule
`restart_workflow` will ALWAYS report `DIDNT_OPEN_A_PORT` for Expo artifacts with `router = "expo-domain"` in their `artifact.toml`. This is not a code bug.

**Why:** The Replit platform's port health check goes through the web proxy, which does NOT route to the Expo dev domain. Metro binds correctly on its localPort (confirmed: opens in ~5 seconds via direct curl), but the proxy-based health check can't reach it.

**How to apply:**
- Do NOT spend time debugging or modifying the dev command when this error appears
- Do NOT change `--localhost` flag, `--web` flag, or the `ensurePreviewReachable` setting trying to fix it
- The Expo app IS running correctly when Metro shows "Web is waiting on http://localhost:<PORT>"
- Users access via Expo Go QR code scan (not web preview)
- Just call `presentArtifact` and proceed — the workflow technically "failed" but the app works
