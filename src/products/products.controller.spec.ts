import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

describe('ProductsController', () => {
  let controller: ProductsController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: ProductsService;

  const mockProduct: Product = {
    id: 'uuid-1234',
    name: 'Test Product',
    description: 'A test product',
    price: 100.0,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockProductsService = {
    findAll: jest.fn().mockResolvedValue([mockProduct]),
    findOne: jest.fn().mockResolvedValue(mockProduct),
    create: jest.fn().mockResolvedValue(mockProduct),
    update: jest.fn().mockResolvedValue({
      message: 'Product updated successfully',
      product: mockProduct,
    }),
    remove: jest
      .fn()
      .mockResolvedValue({ message: 'Product deleted successfully' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockProduct]);
      expect(mockProductsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single product by ID', async () => {
      const result = await controller.findOne('uuid-1234');
      expect(result).toEqual(mockProduct);
      expect(mockProductsService.findOne).toHaveBeenCalledWith('uuid-1234');
    });
  });

  describe('create', () => {
    it('should create and return a product', async () => {
      const result = await controller.create({
        name: 'Test Product',
        description: 'A test product',
        price: 100.0,
        isActive: true,
      });
      expect(result).toEqual(mockProduct);
      expect(mockProductsService.create).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update and return the product', async () => {
      const result = await controller.update('uuid-1234', {
        name: 'Updated Product',
      });
      expect(result).toEqual({
        message: 'Product updated successfully',
        product: mockProduct,
      });
      expect(mockProductsService.update).toHaveBeenCalledWith('uuid-1234', {
        name: 'Updated Product',
      });
    });
  });

  describe('remove', () => {
    it('should remove the product and return a message', async () => {
      const result = await controller.remove('uuid-1234');
      expect(result).toEqual({ message: 'Product deleted successfully' });
      expect(mockProductsService.remove).toHaveBeenCalledWith('uuid-1234');
    });
  });
});
