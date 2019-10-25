const routes = require("express").Router()
const products = require("./products")

routes.get("/products", products.getAllProducts)

routes.get("/products/:id", products.getProductById)

routes.post("/products", products.createProduct)

routes.put("/products/:id", products.updateProduct)

routes.delete("/products/:id", products.deleteProduct)

routes.post("/products/:productId/contracts/:contractId", products.associateContract)

module.exports = routes