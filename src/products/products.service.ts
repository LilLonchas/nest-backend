import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,  // Conexión a la base de datos para productos
  ) {}

  // Crear un nuevo producto
  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);  // Crear el producto a partir del DTO
    await this.productRepository.save(product);  // Guardar el producto en la base de datos
    return product;  // Retornar el producto recién creado
  }

  // Obtener todos los productos
  async findAll() {
    return await this.productRepository.find();  // Recuperar todos los productos desde la base de datos
  }

  // Obtener un solo producto por su ID
  async findOne(id: number) {
    return await this.productRepository.findOne({
      where: { id },  // Usamos el objeto 'where' para especificar la búsqueda
    });
  }
  
  // Actualizar un producto
  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.productRepository.update(id, updateProductDto);  // Actualizar el producto con el ID y el DTO
    return this.findOne(id);  // Retornar el producto actualizado
  }

  // Eliminar un producto
  async remove(id: number) {
    const product = await this.findOne(id);  // Buscar el producto por ID
    if (product) {
      await this.productRepository.remove(product);  // Eliminar el producto de la base de datos
      return { message: `Producto #${id} eliminado` };  // Mensaje de éxito
    } else {
      return { message: `Producto #${id} no encontrado` };  // Mensaje de error si no se encuentra
    }
  }
}
