const productService = require('../../src/services/product-service');
const request = require('supertest');
const app = require('../../src/app');

describe('ProductService', () => {
  describe('getAllProducts', () => {
    it('should return all products when no filters are applied', async () => {
      const result = await productService.getAllProducts({});
      expect(result).toHaveProperty('products');
      expect(Array.isArray(result.products)).toBe(true);
      expect(result.products.length).toBeGreaterThan(0);
      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('limit');
      expect(result).toHaveProperty('offset');
    });

    it('should return products with pagination applied', async () => {
      const result = await productService.getAllProducts({ limit: 5, offset: 0 });
      expect(result).toHaveProperty('products');
      expect(Array.isArray(result.products)).toBe(true);
      expect(result.products.length).toBeLessThanOrEqual(5);
      expect(result).toHaveProperty('limit', 5);
      expect(result).toHaveProperty('offset', 0);
    });

    it('should return an empty list if no products match the filter', async () => {
      const result = await productService.getAllProducts({ category: 'non-existent-category' });
      expect(result).toHaveProperty('products');
      expect(Array.isArray(result.products)).toBe(true);
      expect(result.products.length).toBe(0);
      expect(result.total).toBe(0);
    });
  });

  describe('getProductById', () => {
    it('should return the correct product when a valid ID is provided', async () => {
      const mockProduct = { id: 1, name: 'Test Product', price: 19.99 };
      jest.spyOn(productService, 'getProductById').mockResolvedValue(mockProduct);
      
      const product = await productService.getProductById(1);
      expect(product).toMatchObject(mockProduct);
    });

    it('should return null if the product ID does not exist', async () => {
      jest.spyOn(productService, 'getProductById').mockResolvedValue(null);
      
      const product = await productService.getProductById(9999);
      expect(product).toBeNull();
    });
  });

  describe('createProduct', () => {
    it('should successfully create a new product', async () => {
      const newProduct = {
        name: 'Test Product',
        price: 19.99,
        category: 'Test Category',
      };
      const mockCreatedProduct = { id: 2, ...newProduct };
      jest.spyOn(productService, 'createProduct').mockResolvedValue(mockCreatedProduct);

      const createdProduct = await productService.createProduct(newProduct);
      expect(createdProduct).toMatchObject(mockCreatedProduct);
    });
  });

  describe('deleteProduct', () => {
    it('should delete the product with a valid ID', async () => {
      jest.spyOn(productService, 'deleteProduct').mockResolvedValue(true);
      
      const result = await productService.deleteProduct(1);
      expect(result).toBe(true);
    });

    it('should return false when trying to delete a non-existent product', async () => {
      jest.spyOn(productService, 'deleteProduct').mockResolvedValue(false);
      
      const result = await productService.deleteProduct(9999);
      expect(result).toBe(false);
    });
  });
});

describe('Product API Routes', () => {
  const validApiKey = 'test-api-key';

  describe('GET /api/products', () => {
    it('should return 401 if no API key is provided', async () => {
      const res = await request(app).get('/api/products');
      expect(res.statusCode).toEqual(401);
    });

    it('should return a list of products with a valid API key', async () => {
      const res = await request(app)
        .get('/api/products')
        .set('X-API-Key', validApiKey);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('products');
      expect(Array.isArray(res.body.products)).toBe(true);
    });
  });

  describe('GET /api/products/:id', () => {
    it('should return 404 if product does not exist', async () => {
      const res = await request(app)
        .get('/api/products/9999')
        .set('X-API-Key', validApiKey);
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('POST /api/products', () => {
    it('should return 201 and create a new product', async () => {
      const newProduct = { name: 'New Product', price: 10.99, category: 'Test' };
      const res = await request(app)
        .post('/api/products')
        .set('X-API-Key', validApiKey)
        .send(newProduct);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toMatchObject(newProduct);
    });
  });
});
