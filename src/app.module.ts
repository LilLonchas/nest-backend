import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module'; 
import { Product } from './products/entities/product.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';   

@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', 
      password: 'juan',
      database: 'ecommerce',
      entities: [Product, User], 
      synchronize: true, 
      logging: true, 
    }),
    ProductsModule,
    UserModule, 
  ],
})
export class AppModule {}
