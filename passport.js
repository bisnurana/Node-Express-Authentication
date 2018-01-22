const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const keys = require('./config/keys');
const User = require('./models/user');
// JWT strategy
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

// Google token strategy
passport.use('googleToken', new GooglePlusTokenStrategy(
  { clientID: keys.GOOGLE_CLIENTID, clientSecret: keys.GOOGLE_CLIENTSECRET },
  async (acessToken, refreshToken, profile, done) => {
    // console.log('profile', profile);
    try {
      const existingUser = await User.findOne({ 'google.id': profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const newUser = new User({
        method: 'google',
        google: {
          id: profile.id,
          email: profile.emails[0].value,
        },
      });
      await newUser.save();
      done(null, newUser);
    } catch (error) {
      return done(error, false, error.message);
    }
  },
));

// Facebook strategy
passport.use('facebookToken', new FacebookTokenStrategy(
  { clientID: keys.FACEBOOK_APPID, clientSecret: keys.FACEBOOK_APPSECRET },
  async (acessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ 'facebook.id': profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const newUser = new User({
        method: 'facebook',
        facebook: {
          id: profile.id,
          email: profile.emails[0].value,
        },
      });
      await newUser.save();
      done(null, newUser);
    } catch (error) { return done(error, false, error.message); }
  },
));


// Local strategy
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await User.findOne({ 'local.email': email });
    if (!user) {
      return done(null, false);
    }
    const isMatch = await user.isPasswordValid(password);
    if (!isMatch) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) { done(error, false); }
}));
