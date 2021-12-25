import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async verifyToken(req: any) {
    const header: string = req.headers.authorization || '';
    console.log('req', req.user);
    if (!header) throw new Error('No token');

    const token: string = header.split(' ')[1];

    // req.account =

    return await this.jwtService.verify(token);
  }

  async signToken(payload: { account: { id: string } }) {
    return this.jwtService.sign(payload);
  }
}
