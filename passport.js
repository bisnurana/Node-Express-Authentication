const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const keys = require('./config/keys');
const User = require('./models/user');

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: keys.JWT_SECRET,
}, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (!user) { return done(null, false); }
    done(null, user);
  } catch (error) { done(error, false); }
}));

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  const user = await User.findOne({ email });
  if (!user) {
    return done(null, false);
  }
}));
