// 'use strict'

// exports.handler = function (event, context, callback) {
//   var response = {
//     statusCode: 200,
//     headers: {
//       'Content-Type': 'text/html; charset=utf-8'
//     },
//     body: '<p>Plop!</p>'
//   }
//   callback(null, response)
// }

'use strict'
const express = require('express');

function apiRoutes() {
  const routes = new express.Router();

  routes.get('/v1/version', (req, res) => res.send({ version: '1' }));

  routes.post('/v1/echo', (req, res) => res.send({ ...req.body }));

  return routes;
}


const app = express()
  .use(express.json())
  .use(apiRoutes());

const isInLambda = !!process.env.LAMBDA_TASK_ROOT;
if (isInLambda) {
  const serverlessExpress = require('aws-serverless-express');
  const server = serverlessExpress.createServer(app);
  exports.handler = (event, context) => serverlessExpress.proxy(server, event, context)
} else {
  app.listen(3000, () => console.log(`Listening on 3000`));
}