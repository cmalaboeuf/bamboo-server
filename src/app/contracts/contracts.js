const db = require("../../pool/db")

const getAllContracts = (req, res) => {
  db.query("SELECT * FROM contracts", (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json({
      status : 200,
      data: results.rows
    })
  })
}

const getContractById = (req, res) => {
  const id = parseInt(req.params.id)
  db.query("SELECT * FROM contracts WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json({
      status : 200,
      data: results.rows
    })
  })
}
const createContract = (req, res) => {
  const { name, content, durationYear } = req.body
  console.log(req.body)
  if(!name || !content || ! durationYear){
    res.status(400).json({
      status: 400,
      message : `Requested field : name, content, durationYear`
    })
  }
  db.query("INSERT INTO contracts (name, content,durationYear, created_on) VALUES ($1, $2, $3, now()) RETURNING id",
    [name, content, durationYear], (error, results,id) => {
      if (error) {
        throw error
      }
      res.status(201).json({
        status : 201,
        insertId : results.rows[0].id,
        message: `Contract created with ${results.rows[0].id}`
      })
    })
}

const updateContract = (req, res) => {
  const id = parseInt(req.params.id)
  const { name, content, durationYear } = req.body
  if(!name || !content || ! durationYear){
    res.status(400).json({
      status: 400,
      message : `Requested field : name, content, durationYear`
    })
  }
  db.query(
    "UPDATE contracts SET name = $1, content = $2, durationYear = $3  WHERE id = $4",
    [name, content, durationYear, id],
    (error) => {
      if (error) {
        throw error
      }
      res.status(200).json({
        status: 200,
        message: `Contract modified with ID: ${id}`
      })
    }
  )
}

const deleteContract = (request, res) => {
  const id = parseInt(request.params.id)
  db.query("DELETE FROM contracts WHERE id = $1", [id], (error) => {
    if (error) {
      throw error
    }
    res.status(200).json({
      status: 200,
      message: `Contract deleted with ID: ${id}`
    })
  })
}

module.exports = {
  getAllContracts,
  getContractById,
  createContract,
  updateContract,
  deleteContract,
}