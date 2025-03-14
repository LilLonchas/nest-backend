import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';  // Importa Request de Express

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();  // Usa Request de Express
    const authHeader = request.headers.authorization;

    if (!authHeader) return false; // Si no hay token, rechazar acceso

    const token = authHeader.split(' ')[1]; // Obtener el token después de "Bearer "
    try {
      const decoded = this.jwtService.verify(token);  // Verificar el token
      (request as any).user = decoded;  // Usa 'any' para evitar el error
      return true;
    } catch (error) {
      return false; // Si el token es inválido, rechazar acceso
    }
  }
}
