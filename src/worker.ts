interface Env {
  ASSETS: Fetcher;
}

const CANONICAL_HOST = 'ailegalpractice.com';

function canonicalRedirect(url: URL): URL | null {
  const redirect = new URL(url);

  if (url.hostname === `www.${CANONICAL_HOST}` || url.hostname !== CANONICAL_HOST) {
    redirect.hostname = CANONICAL_HOST;
    redirect.protocol = 'https:';
    return redirect;
  }

  if (url.protocol === 'http:') {
    redirect.protocol = 'https:';
    return redirect;
  }

  if (url.pathname === '/index.html') {
    redirect.pathname = '/';
    return redirect;
  }

  if (
    url.pathname !== '/' &&
    !url.pathname.endsWith('/') &&
    !/\.[a-zA-Z0-9]+$/.test(url.pathname)
  ) {
    redirect.pathname = `${url.pathname}/`;
    return redirect;
  }

  return null;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const redirect = canonicalRedirect(url);

    if (redirect) {
      return Response.redirect(redirect.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
