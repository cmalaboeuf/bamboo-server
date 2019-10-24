const routes = require("express").Router()
const auth = require("./authentication")

routes.post("/register", auth.register)
routes.post("/login", auth.login)


module.exports = routes