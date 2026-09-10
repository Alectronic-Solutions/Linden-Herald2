// Keep the downloaded documents byte-for-byte unchanged, including .php links.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === 'POST' && url.pathname === '/contact.php') {
      // Only the visitor's explicit form submission sends information. The 307
      // preserves the POST body and lets the original site process the message.
      return Response.redirect('https://lindenherald.com/contact.php', 307);
    }
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
    }
    const response = await env.ASSETS.fetch(request);
    if (url.pathname.endsWith('.php') && response.ok) {
      const headers = new Headers(response.headers);
      headers.set('Content-Type', 'text/html; charset=utf-8');
      return new Response(response.body, { status: response.status, headers });
    }
    return response;
  }
};
