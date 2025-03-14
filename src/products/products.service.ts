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
    private productRepository: Repository<Product>,  
  ) {}

 
  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);  
    await this.productRepository.save(product);  
    return product;  
  }


  async findAll() {
    return await this.productRepository.find();  
  }

  
  async findOne(id: number) {
    return await this.productRepository.findOne({
      where: { id },  
    });
  }
  
 
  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.productRepository.update(id, updateProductDto);  
    return this.findOne(id);
  }

 
  async remove(id: number) {
    const product = await this.findOne(id);  
    if (product) {
      await this.productRepository.remove(product);  
      return { message: `Producto #${id} eliminado` };  
    } else {
      return { message: `Producto #${id} no encontrado` };  
    }
  }
}
