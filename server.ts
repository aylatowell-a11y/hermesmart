// Standalone entry point for Render (health-check only).
// The store's real backend (server/src/actions.ts) runs on the Hatch runtime
// and needs a database adapter before it can run here, so this server only
// answers health checks for now.
const port = Number(process.env.PORT || 3000);

Bun.serve({
  port,
  fetch(req: Request) {
    const url = new URL(req.url);
    if (url.pathname === "/" || url.pathname === "/health") {
      return new Response("ok", { status: 200 });
    }
    return new Response("not found", { status: 404 });
  },
});

console.log(`Hermes backend listening on port ${port}`);
