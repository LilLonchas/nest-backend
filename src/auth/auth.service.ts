import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Método para validar el usuario
  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);  // Aquí estamos usando findByUsername
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;  // Excluir la contraseña
      return result;
    }
    return null;  // Si las credenciales son incorrectas, retornar null
  }

  // Método para el login (generar el JWT)
  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');  // Si el usuario no es válido
    }

    const payload = { username: user.username, id: user.id };  // Cargar el payload del token
    return {
      access_token: this.jwtService.sign(payload),  // Generar el JWT
    };
  }
}
