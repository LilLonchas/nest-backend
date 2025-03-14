import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UsersController } from './user.controller';
import { JwtModule } from '@nestjs/jwt'; // Importar JwtModule

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'secretKey',  // Asegúrate de que este valor sea seguro
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService], // Exportar el servicio para que otros módulos lo usen
})
export class UserModule {}
