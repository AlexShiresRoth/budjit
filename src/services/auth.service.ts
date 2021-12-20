import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async verifyToken(token: string) {
    return await this.jwtService.verify(token);
  }

  async signToken(payload: { account: { id: string } }) {
    return this.jwtService.sign(payload);
  }
}
