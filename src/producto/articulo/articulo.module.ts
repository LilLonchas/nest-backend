import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArticuloController } from './articulo.controller';
import { ArticuloService } from './articulo.service';
import { Articulo } from './entities/articulo.entity';
import { Admin } from '../admin/entities/admin.entity'; // ✅ Importa Admin

@Module({
  imports: [
    TypeOrmModule.forFeature([Articulo, Admin])
  ],
  controllers: [ArticuloController],
  providers: [ArticuloService],
})
export class ArticuloModule {}

