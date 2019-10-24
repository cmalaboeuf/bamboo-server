const db = require("../../pool/db")

const getAllProducts = (req, res) => {
  db.query("SELECT * FROM products", (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json({
      data: results.rows
    })
  })
}

const getProductById = (req, res) => {
  const id = parseInt(req.params.id)

  db.query("SELECT * FROM products WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json({
      data: results.rows
    })
  })
}
const createProduct = (req, res) => {
  const { name, description, link } = req.body

  db.query("INSERT INTO products (name, description,link, created_on) VALUES ($1, $2, $3, now())",
    [name, description, link], (error, results) => {
      if (error) {
        throw error
      }

      res.status(201).json({
        status: 201,
        message: "Product created with " + results.insertId
      })
    })
}

const updateProduct = (req, res) => {
  const id = parseInt(req.params.id)
  const { name, description, link } = req.body

  db.query(
    "UPDATE products SET name = $1, description = $2, link = $3  WHERE id = $4",
    [name, description, link, id],
    (error) => {
      if (error) {
        throw error
      }
      res.status(200).json({
        status: 200,
        message: `Product modified with ID: ${id}`
      })
    }
  )
}

const deleteProduct = (request, res) => {
  const id = parseInt(request.params.id)

  db.query("DELETE FROM products WHERE id = $1", [id], (error) => {
    if (error) {
      throw error
    }
    res.status(200).json({
      status: 200,
      message: `Product deleted with ID: ${id}`
    })
  })
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}