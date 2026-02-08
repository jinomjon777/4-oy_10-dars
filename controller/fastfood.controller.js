const { v4 } = require("uuid")
const ejs = require("ejs")
const { read_file, write_file } = require("../api/file-system")

const getAllProducts = async (req, res) => {
  try {
    const product = read_file("fastfood.json")

    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = read_file("fastfood.json")

    const foundedFastfood = product.find((item) => item.id === id)

    if (!foundedFastfood) {
      return res.json({
        message: "Not found"
      })
    }

    res.status(200).json(foundedFastfood)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const addProduct = async (req, res) => {
  try {
    const { ilm, kunlikish, sport } = req.body

    const product = read_file("fastfood.json")

    product.push({
      id: v4(),
      image: "image/one.jpg",
      ilm,
      kunlikish,
      sport,
    })

    write_file("fastfood.json", product)
    res.status(200).json({
      message: "Added new product"
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const { ilm, kunlikish, sport } = req.body
    const product = read_file("fastfood.json")

    const foundedFastfood = product.find((item) => item.id === id)

    if (!foundedFastfood) {
      return res.json({
        message: "Not found"
      })
    }

    product.forEach((item, idx) => {
      if (item.id === id) {
        item.ilm = ilm ? ilm : item.ilm
        item.kunlikish = kunlikish ? kunlikish : item.kunlikish
        item.sport = sport ? sport : item.sport
      }
    })

    write_file("fastfood.json", product)

    res.status(200).json({
      message: "Updated product"
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = read_file("fastfood.json")

    const foundedFastfood = product.find((item) => item.id === id)

    if (!foundedFastfood) {
      return res.json({ 
        message: "Not found"
      })
    }

    product.forEach((item, idx) => {
      if (item.id === id) {
        product.splice(idx, 1)
      }
    })

    write_file("fastfood.json", product)

    res.status(200).json({
      message: "Deleted product"
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  getAllProducts,
  getOneProduct,
  addProduct,
  updateProduct,
  deleteProduct
}