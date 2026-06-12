const MARKDOWN_MAP = {
  '/': '/md/index.md',
  '/index.html': '/md/index.md',
  '/about': '/md/about.md',
  '/about.html': '/md/about.md',
  '/contact': '/md/contact.md',
  '/contact.html': '/md/contact.md',
  '/services/oil-change': '/md/oil-change.md',
  '/services/oil-change.html': '/md/oil-change.md',
};

export async function onRequest(context) {
  const { request, next } = context;
  const accept = request.headers.get('Accept') || '';

  if (accept.includes('text/markdown')) {
    const url = new URL(request.url);
    const mdPath = MARKDOWN_MAP[url.pathname];

    if (mdPath) {
      const mdUrl = new URL(mdPath, url.origin);
      const mdRequest = new Request(mdUrl.toString(), {
        headers: request.headers,
        method: 'GET',
      });

      const response = await context.env.ASSETS.fetch(mdRequest);

      if (response.ok) {
        const newHeaders = new Headers(response.headers);
        newHeaders.set('Content-Type', 'text/markdown; charset=utf-8');
        newHeaders.set('Vary', 'Accept');
        return new Response(response.body, {
          status: 200,
          headers: newHeaders,
        });
      }
    }
  }

  const response = await next();

  const newHeaders = new Headers(response.headers);
  newHeaders.set('Vary', 'Accept');

  return new Response(response.body, {
    status: response.status,
    headers: newHeaders,
  });
}
