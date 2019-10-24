const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const passport = require("passport")

const products = require("./app/products/routes")
const authentication = require("./app/users/routes")
require("./middleware/passport")(passport)

const apiRoutes = () => {
  const routes = new express.Router()
  routes
  //routes.use("/api/v", products)
  //routes.use("/api", authentication)
  return routes
}


const app = express()
app.use(express.json())
  .use(cors())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(passport.initialize())
  .get("/api", (req, res) => res.json({ version: "1" }))
  .use("/api/v1/", passport.authenticate("jwt", { session: false }), (req, res, next) => {
    next()
  })
  //.use(apiRoutes)
  .use("/api/v1/", products)
  .use("/api", authentication)
// app.use((req, res, next) => {
//   res.status(404).json({
//     error: "Something went wrong"
//   })
// })

const isInLambda = !!process.env.LAMBDA_TASK_ROOT
if (isInLambda) {
  const serverlessExpress = require("aws-serverless-express")
  const server = serverlessExpress.createServer(app)
  exports.handler = (event, context) => serverlessExpress.proxy(server, event, context)
} else {
  app.listen(3000, () => console.log("Listening on 3000"))
}