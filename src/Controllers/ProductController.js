const mongoose = require("mongoose");

class ProductController {
  constructor(ProductService) {
    this.ProductService = ProductService;

    // bind this

    this.getAllProducts = this.getAllProducts.bind(this);
    this.getProductById = this.getProductById.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  async getAllProducts(req, res) {
    try {
      const products = await this.ProductService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProductById(req, res) {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidId) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
      const product = await this.ProductService.getProductById(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createProduct(req, res) {
    const { name, price, description, category } = req.body;
    if (!name || !price || !description || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }
    try {
      const product = await this.ProductService.createProduct({
        name,
        price,
        description,
        category,
      });
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateProduct(req, res) {
    const { id, name, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!id) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidId) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
      const updatedProduct = await this.ProductService.updateProduct(id, {
        name,
        price,
      });

      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteProduct(req, res) {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidId) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
      const deletedProduct = await this.ProductService.deleteProduct(id);

      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProductController;
