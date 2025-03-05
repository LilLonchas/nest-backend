import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module'; // Importa el módulo de productos
import { Product } from './products/entities/product.entity'; // Importa la entidad Product

@Module({
  imports: [
    // Importa TypeOrmModule con la configuración del DataSource
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Cambia esto si tu base de datos está en otra dirección
      port: 5432,
      username: 'postgres', // Cambia este valor por tu usuario de PostgreSQL
      password: 'juan', // Cambia este valor por tu contraseña de PostgreSQL
      database: 'ecommerce', // Nombre de tu base de datos
      entities: [Product], // Asegúrate de que las entidades estén bien configuradas
      synchronize: true, // Usa true solo en desarrollo
      logging: true, // Habilitar los logs para detectar posibles problemas
    }),
    ProductsModule, // Asegúrate de que el módulo de productos esté importado
  ],
})
export class AppModule {}
