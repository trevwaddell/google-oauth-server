require("dotenv").config();

import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const port = process.env.PORT || 9001;

const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log({ accessToken, refreshToken, profile });
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

app.get("/auth/google/callback", passport.authenticate("google"));

app.listen(port, () => console.log(`Listening on PORT ${port}`));
