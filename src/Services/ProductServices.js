class ProductService {
  constructor(ProductModel) {
    this.ProductModel = ProductModel;
  }

  async getAllProducts() {
    return await this.ProductModel.find();
  }

  async getProductById(productId) {
    return await this.ProductModel.findById(productId);
  }

  async createProduct(productData) {
    return await this.ProductModel.create(productData);
  }

  async updateProduct(productId, productData) {
    return await this.ProductModel.findByIdAndUpdate(productId, productData, {
      new: true,
    });
  }

  async deleteProduct(productId) {
    return await this.ProductModel.findByIdAndDelete(productId);
  }
}

module.exports = ProductService;
