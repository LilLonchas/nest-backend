import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';



// DTOs
import { CreateArticuloDto } from './dto/create-articulo.dto';
import { UpdateArticuloDto } from './dto/update-articulo.dto';

// ENTIDAD
import { Articulo } from './entities/articulo.entity';
import { Admin } from '../admin/entities/admin.entity';

@Injectable()
export class ArticuloService {
  constructor(
    @InjectRepository(Articulo)
    private readonly articuloRepository: Repository<Articulo>,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}


  async create(createArticuloDto: CreateArticuloDto): Promise<Articulo> {
    const { adminId, ...restoDatos } = createArticuloDto;
  
    // Buscamos el Admin antes de asociarlo
    const admin = await this.adminRepository.findOne({ where: { id: adminId } });
  
    if (!admin) {
      throw new NotFoundException(`Admin con id ${adminId} no encontrado`);
    }
  
    // Creamos el artículo con el admin relacionado
    const articulo = this.articuloRepository.create({
      ...restoDatos,
      admin, // Relación asignada aquí
    });
  
    console.log(' Articulo creado antes de guardar:', articulo);
  
    return this.articuloRepository.save(articulo);
  }
  

  

  async update(id: number, updateArticuloDto: UpdateArticuloDto): Promise<Articulo> {
    const { adminId, ...restoDatos } = updateArticuloDto;

    const articulo = await this.findOne(id);

    if (adminId) {
      const admin = await this.adminRepository.findOne({ where: { id: adminId } });
      if (!admin) throw new NotFoundException(`Admin ${adminId} no encontrado`);

      articulo.admin = admin;
    }

    Object.assign(articulo, restoDatos);

    return this.articuloRepository.save(articulo);
  }

  async findAll(): Promise<Articulo[]> {
    return this.articuloRepository.find({ relations: ['admin'] });
  }

  async findOne(id: number): Promise<Articulo> {
    const articulo = await this.articuloRepository.findOne({
      where: { id },
      relations: ['admin'],
    });

    if (!articulo) {
      throw new NotFoundException(`Articulo con id ${id} no encontrado`);
    }

    return articulo;
  }

  async remove(id: number): Promise<void> {
    const articulo = await this.findOne(id);
    await this.articuloRepository.delete(id);
  }
}
