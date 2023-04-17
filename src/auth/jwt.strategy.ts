import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Config } from 'src/helper/config.helper';
import { AuthService } from 'src/service/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Config.get('ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: any) {
    const { username } = payload;
    const user = await this.authService.getUserLogin(username);
    return user;
  }
}
