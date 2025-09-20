import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const jwtSecret = process.env.JWT_ACCESS_SECRET!;
if (!jwtSecret) {
  throw new Error("JWT_ACCESS_SECRET missing");
}

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
      algorithms: ["HS256"],
    },
    async (payload, done) => {
      try {
        const user = await prisma.user.findUnique({ where: { id: payload.sub } });
        if (!user) return done(null, false);
        return done(null, { id: user.id, email: user.email });
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

export default passport;
