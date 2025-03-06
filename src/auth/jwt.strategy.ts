import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interfaces'; 
import { ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      secretOrKey: 'secretKey', 
    });
  }

  async validate(payload: JwtPayload) {
    // Aquí puedes hacer lo que quieras con el payload (como buscar al usuario)
    return { userId: payload.sub, username: payload.username };
  }
}
