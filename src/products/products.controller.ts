import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() productData: Partial<Product>): Promise<Product> {
    return await this.productsService.create(productData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() productData: Partial<Product>,
  ): Promise<{ message: string; product: Product }> {
    return this.productsService.update(id, productData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.productsService.remove(id);
  }
}
