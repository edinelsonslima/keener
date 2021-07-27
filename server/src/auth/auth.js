const bcrypt = require('bcryptjs')
const localStrategy = require('passport-local').Strategy

module.exports = function(passport){

    passport.serializeUser((user, done) => {
        done(null, user[0].id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const {findUserById} = require('./findUser')
            const user = await findUserById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });

    passport.use(new localStrategy({
        usernameField: 'user',
        passwordField: 'password'
    },
       async (username, password, done) => {
            try {
                const {findUser} = require('./findUser')
                const user = await findUser(username);

                // usuário inexistente
                if (user.length <= 0) { return done(null, false) }
                
                // comparando as senhas
                const isValid = bcrypt.compareSync(password, user[0].password);
                if (!isValid) return done(null, false)
                
                return done(null, user)
            } catch (err) {
                done(err, false);
            }
        }
    ));
}