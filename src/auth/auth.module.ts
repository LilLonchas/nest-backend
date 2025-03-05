import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';  // Asegúrate de que el módulo de User esté importado
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule, // Importamos el módulo de usuarios
    PassportModule,
    JwtModule.register({
      secret: 'secretKey', // Usa una clave secreta aquí
      signOptions: { expiresIn: '1h' }, // El token expirará en 1 hora
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
