const routes = require("express").Router()
const contracts = require("./contracts")

routes.get("/contracts", contracts.getAllContracts)

routes.get("/contracts/:id", contracts.getContractById)

routes.post("/contracts", contracts.createContract)

routes.put("/contracts/:id", contracts.updateContract)

routes.delete("/contracts/:id", contracts.deleteContract)

module.exports = routes