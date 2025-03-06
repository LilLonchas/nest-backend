import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';  // Para cifrar contraseñas
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,  // Inyectar el JwtService para manejar los JWT
  ) {}

  // Método para registrar un usuario
  async register(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });

    if (existingUser) {
      throw new Error('El usuario ya existe');
    }

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }

  // Método para autenticar al usuario (inicio de sesión)
  async login(username: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Comparar las contraseñas
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Contraseña incorrecta');
    }

    // Generar un JWT
    const payload = { username: user.username, id: user.id };
    const token = this.jwtService.sign(payload);  // Generar el token JWT

    return {
      access_token: token,  // Retornar el token al cliente
    };
  }

  // Método adicional para encontrar un usuario por su nombre de usuario
  async findByUsername(username: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { username },
    });

    return user || null;  // Si no se encuentra el usuario, retornar null
  }
}
