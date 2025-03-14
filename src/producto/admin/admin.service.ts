import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// DTOs
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

// ENTIDAD
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  // ✅ CREATE
  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const admin = this.adminRepository.create(createAdminDto);
    return this.adminRepository.save(admin);
  }

  // ✅ FIND ALL
  async findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  // ✅ FIND ONE
  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminRepository.findOne({
      where: { id }
    });

    if (!admin) {
      throw new NotFoundException(`Admin con id ${id} no encontrado`);
    }

    return admin;
  }

  // ✅ UPDATE
  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    await this.adminRepository.update(id, updateAdminDto);

    const updatedAdmin = await this.adminRepository.findOne({
      where: { id },
      relations: ['articulos'],
    });

    if (!updatedAdmin) {
      throw new NotFoundException(`Admin con id ${id} no encontrado`);
    }

    return updatedAdmin;
  }

 // ✅ REMOVE
 async remove(id: number): Promise<void> {
  const admin = await this.findOne(id); // Valida que exista primero
  await this.adminRepository.delete(admin.id);
}
}