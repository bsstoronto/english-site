// Password lock for the whole site (until launch).
// The password is NOT written here: it is read from the Vercel setting SITE_PASSWORD.
// To open the site to everyone later, delete this file (and package.json) from GitHub.
export default function middleware(request) {
  const password = process.env.SITE_PASSWORD;
  const auth = request.headers.get("authorization") || "";
  if (password && auth.startsWith("Basic ")) {
    try {
      const decoded = atob(auth.slice(6));
      const given = decoded.slice(decoded.indexOf(":") + 1);
      if (given === password) return; // correct password: show the site
    } catch (e) {}
  }
  return new Response("This site is private for now. Please enter the password.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Sprout English (private)", charset="UTF-8"' },
  });
}
