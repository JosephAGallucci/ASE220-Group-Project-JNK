import jwt from "jsonwebtoken";


// checks the bearer token on the request
export function requireAuth(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    res.status(401).json({ error: "no token" });
    return;
  }


  //header should look like "Bearer <token>"
  let token = null;

  if (header.startsWith("Bearer ")) {
    token = header.slice(7);
  }

  if (!token) {
    res.status(401).json({ error: "no token" });
    return;
  }


  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: data.sub,
      username: data.username,
    };

    next();

  } catch (e) {
    res.status(401).json({ error: "bad token" });
    return;
  }
}
