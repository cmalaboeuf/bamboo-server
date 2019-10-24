const jwt = require("jwt-simple")
const bcrypt = require("bcrypt")
const db = require("../../pool/db")
const secret = process.env.SECRET || "secret"
const authentication = {
  login: (req, res) => {
    console.log(req.body)

    const { email, password } = req.body
    db.query("SELECT * FROM users WHERE email = $1", [email], (error, results) => {
      if (error) {
        throw error
      }
      console.log(results.rows[0])
      console.log(secret)
      if (!results.rows[0]) {
        res.status(403).send({ success: false, msg: "Authentication failed" })
      }
      else {
        if (password === results.rows[0].password) {
          let token = jwt.encode(results, secret)
          res.json({ success: true, token: token })
        }
        else {
          return res.status(403).send({ success: false, msg: "Authentication failed" })
        }
        // comparePassword(password, results.rows[0].password, function (err, isMatch) {
        //   if (isMatch && !err) {
        //     let token = jwt.encode(results, secret)
        //     res.json({ success: true, token: token, results })
        //   } else {
        //     return res.status(403).send({ success: false, msg: "Authentication failed" })
        //   }
        // })
      }
    })
  },
  register: (req, res) => {
    console.log(req.body)

    const { email, password, username } = req.body
    if (!email || !password || !username) {
      res.status(400).send({ success: false, msg: "Enter all values" })
    }
    else {
      db.query("INSERT INTO users (username, email, password, created_on) VALUES ($1, $2, $3, now())",
        [username, email, password], (error) => {
          if (error) {
            throw error
          }
          res.status(201).json({
            status: 201,
            message: "Successfully created"
          })
        })
    }
  },
  // getinfo: function (req, res) {
  //   if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
  //     let token = req.headers.authorization.split(' ')[1]
  //     let decodedtoken = jwt.decode(token, config.secret)
  //     return res.json({ success: true, msg: 'hello ' + decodedtoken.name })
  //   }
  //   else {
  //     return res.json({ success: false, msg: 'No header' })
  //   }
  // }
}

const comparePassword = (passw, password, cb) => {
  bcrypt.compare(passw, password, function (err, isMatch) {
    if (err) {
      return cb(err)
    }
    cb(null, isMatch)
  })
}

module.exports = authentication