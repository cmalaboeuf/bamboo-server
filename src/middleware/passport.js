const secret = process.env.SECRET || "secret"
const { Strategy, ExtractJwt } = require("passport-jwt")

const db = require("../pool/db")

module.exports = function (passport) {

  let opts = {}
  opts.secretOrKey = secret
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  passport.use(new Strategy(opts, function (jwt_payload, done) {
    db.query("SELECT * FROM users WHERE email = $1", [jwt_payload.email], (error, results) => {
      if (error) {
        return done(error, false)
      }
      if (results) {
        return done(null,true)
      } else {
        return done(null, false)
      }
    })
  }))
}