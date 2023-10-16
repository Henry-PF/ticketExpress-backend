const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
/*
const GOOGLE_CALLBACK_URL = ''

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL,
        passReqToCallback: true,
    },
        async (request, accessToken, refreshToken, profile, done) => {
            // const defaultUser = {
            //     googleId: profile.id,
            //     nombre: `${profile.name.givenName}`,
            //     apellido: `${profile.name.familyName}`,
            //     correo_electronico: profile.emails[0].value,
            //     picture: profile.photos[0].value,
            // };

            // const user = User.findOrCreate({
            //     where: { googleId: profile.id },
            //     defaults: defaultUser,
            // })
            //     .catch((error) => {
            //         console.log(error);
            //         done(error, null);
            //     });
            // if (user && user[0]) return done(null, user && user[0]);
            return done(null, profile)
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (id, done) => {
    done(null, done);
});
*/
module.exports = passport;