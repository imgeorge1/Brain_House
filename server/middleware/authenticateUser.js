import { decode } from "jsonwebtoken";

const authentication = async (req, res, next) => {
  const token = req.cookies["next-auth.session-token"] || null;

  if (token == null) {
    return res.redirect("/api/auth/signin");
  }

  const decoded = decode({
    token: token,
    secret: "secret",
  });

  if (decoded !== null) {
    req.accessToken = decoded.access_token;

    try {
      const masto = await login({
        url: mastodonBaseUrl,
        accessToken: req.accessToken,
      });

      req.mastoClient = masto;
      req.profile = await req.mastoClient.v1.accounts.verifyCredentials();
    } catch (error) {
      res.clearCookie("next-auth.session-token");
      res.clearCookie("next-auth.csrf-token");
      res.clearCookie("next-auth.callback-url");
      res.clearCookie("next-auth.pkce.code_verifier");

      return res.redirect("/api/auth/signin");
    }
  }

  next();
};
export default authentication;
