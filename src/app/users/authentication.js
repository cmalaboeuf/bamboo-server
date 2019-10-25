const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')
const db = require('../../pool/db')
const secret = process.env.SECRET || 'secret'

const authentication = {
  login: (req, res) => {
    const { email, password } = req.body
    db.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
      if (error) {
        throw error
      }
      if (!results.rows[0]) {
        res.status(403).send({ status: 403, message: 'Authentication failed' })
      } else {
        comparePassword(password, results.rows[0].password, function (err, isMatch) {
          if (isMatch && !err) {
            let token = jwt.encode(results, secret)
            res.json({ success: true, token })
          } else {
            return res.status(403).send({ status: 403, message: "Authentication failed" })
          }
        })
      }
    })
  },
  register: (req, res) => {
    const { email, password, username } = req.body
    if (!email || !password || !username) {
      res.status(400).send({ success: false, message: 'Enter all values' })
    } else {
      encryptPassword(password, (err,hash) => {
        db.query(`INSERT INTO users (username, email, password, created_on) VALUES ($1, $2, $3, now())`,
          [username, email, hash], (error) => {
            if (error) {
              throw error
            }
            res.status(201).json({
              status: 201,
              message: 'Successfully created',
            })
          })
      })
    }
  },
  // getinfo: function (req, res) {
  //   if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
  //     let token = req.headers.authorization.split(' ')[1]
  //     let decodedtoken = jwt.decode(token, config.secret)
  //     return res.json({ success: true, message: 'hello ' + decodedtoken.name })
  //   }
  //   else {
  //     return res.json({ success: false, message: 'No header' })
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

const encryptPassword = (password, cb) => {
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return cb(err)
    }
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) {
        return cb(err)
      }
      cb(null, hash)
    })
  })
}

module.exports = authentication