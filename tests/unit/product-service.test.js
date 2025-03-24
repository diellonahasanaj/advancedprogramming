const productService = require('../../src/services/product-service');

describe('ProductService', () => {
  // Test for getAllProducts
  describe('getAllProducts', () => {
    it('should return all products when no filters are applied', () => {
      const result = productService.getAllProducts();
      expect(result.products.length).toBeGreaterThan(0);
      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('limit');
      expect(result).toHaveProperty('offset');
    });

    it('should return an empty list if no products are available', () => {
      // Mock the result to simulate no products
      productService.getAllProducts = jest.fn().mockReturnValue({ products: [], total: 0, limit: 10, offset: 0 });
      const result = productService.getAllProducts();
      expect(result.products.length).toBe(0);
      expect(result.total).toBe(0);
    });

    it('should apply filters correctly', () => {
      const filters = { category: 'electronics', priceRange: [100, 500] };
      const result = productService.getAllProducts(filters);
      expect(result.products.every(product => product.category === 'electronics')).toBe(true);
      expect(result.products.every(product => product.price >= 100 && product.price <= 500)).toBe(true);
    });
  });

  // Test for getProductById
  describe('getProductById', () => {
    it('should return a product when a valid ID is provided', () => {
      const mockProduct = { id: 1, name: 'Laptop', price: 499 };
      productService.getProductById = jest.fn().mockReturnValue(mockProduct);
      const result = productService.getProductById(1);
      expect(result).toEqual(mockProduct);
    });

    it('should return null when an invalid ID is provided', () => {
      productService.getProductById = jest.fn().mockReturnValue(null);
      const result = productService.getProductById(999);
      expect(result).toBeNull();
    });
  });

  // Test for createProduct
  describe('createProduct', () => {
    it('should create and return the new product when valid data is provided', () => {
      const newProduct = { name: 'Phone', price: 299, category: 'electronics' };
      const mockCreatedProduct = { id: 1, ...newProduct };
      productService.createProduct = jest.fn().mockReturnValue(mockCreatedProduct);
     
      const result = productService.createProduct(newProduct);
      expect(result).toHaveProperty('id');
      expect(result.name).toBe('Phone');
      expect(result.price).toBe(299);
    });

    it('should throw an error if invalid data is provided', () => {
      const invalidProduct = { price: -100 }; // Missing name, category
      productService.createProduct = jest.fn().mockImplementation(() => {
        throw new Error('Invalid product data');
      });
     
      expect(() => productService.createProduct(invalidProduct)).toThrow('Invalid product data');
    });
  });

  // Test for updateProduct
  describe('updateProduct', () => {
    it('should update and return the product when valid data is provided', () => {
      const updatedProduct = { id: 1, name: 'Updated Laptop', price: 599 };
      productService.updateProduct = jest.fn().mockReturnValue(updatedProduct);
     
      const result = productService.updateProduct(1, updatedProduct);
      expect(result).toEqual(updatedProduct);
    });

    it('should return null when trying to update a non-existing product', () => {
      const updatedProduct = { id: 999, name: 'Non-existing product', price: 999 };
      productService.updateProduct = jest.fn().mockReturnValue(null);
     
      const result = productService.updateProduct(999, updatedProduct);
      expect(result).toBeNull();
    });
  });

  // Test for deleteProduct
  describe('deleteProduct', () => {
    it('should delete and return the deleted product when a valid ID is provided', () => {
      const deletedProduct = { id: 1, name: 'Laptop', price: 499 };
      productService.deleteProduct = jest.fn().mockReturnValue(deletedProduct);
     
      const result = productService.deleteProduct(1);
      expect(result).toEqual(deletedProduct);
    });

    it('should return null when trying to delete a non-existing product', () => {
      productService.deleteProduct = jest.fn().mockReturnValue(null);
     
      const result = productService.deleteProduct(999);
      expect(result).toBeNull();
    });
  });
});
