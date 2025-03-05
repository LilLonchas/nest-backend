import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')  // Ruta base para productos
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Crear un nuevo producto
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  // Obtener todos los productos
  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  // Obtener un producto por su ID
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const product = await this.productsService.findOne(id);

    // Si no se encuentra el producto, lanzamos un error 404
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  // Actualizar un producto
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return await this.productsService.update(id, updateProductDto);
  }

  // Eliminar un producto
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.productsService.remove(id);
  }
}
