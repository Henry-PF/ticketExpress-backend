const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/usuarios');

const GOOGLE_CLIENT_ID = '70581296445-v2s6fqgqf60dsp0p8vp7m5jopr332d01.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'
const GOOGLE_CALLBACK_URL = 'http://localhost:3001/auth/callback'

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: GOOGLE_CALLBACK_URL,
            passReqToCallback: true,
        },
        async (request, accessToken, refreshToken, profile, done) => {
            // const defaultUser = {
            //     googleId: profile.id,
            //     nombre: profile.name.givenName,
            //     apellido: profile.name.familyName,
            //     correo_electronico: profile.emails.value,
            // };

            // Busca o crea el usuario en la base de datos
            // User.findOrCreate({
            //     where: { googleId: profile.id },
            //     defaults: defaultUser,
            // })
            //     .then(([user, created]) => {
            //         if (created) {
            //             // Si el usuario se creó, lo autenticamos
            //             return done(null, user);
            //         } else {
            //             // Si el usuario ya existía, simplemente lo autenticamos
            //             return done(null, user);
            //         }
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //         done(error, null);
            //     });
            done(null, profile)
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user); // Serializa el ID del usuario en la sesión
});

passport.deserializeUser(async (id, done) => {
    done(null, id);
});

module.exports = passport;