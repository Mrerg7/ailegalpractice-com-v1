const CANONICAL_ORIGIN = 'https://ailegalpractice.com';

export function getCanonicalPath(pathname: string): string {
  if (pathname === '/' || pathname === '/index.html') {
    return '/';
  }

  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

export function getCanonicalURL(pathname: string): URL {
  return new URL(getCanonicalPath(pathname), CANONICAL_ORIGIN);
}
