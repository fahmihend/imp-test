import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { AuthDto } from 'src/dto/auth.dto';
import { Users } from 'src/entity/users.entity';
import { Config } from 'src/helper/config.helper';
import { EntityManager } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(@InjectEntityManager() private conn: EntityManager) {
    this.conn = conn;
  }

  async register(params: AuthDto) {
    try {
      // const result = await this.authRepository.regiter(params);
      const salt = await bcrypt.genSalt(10);
      const checkUsername = await this.conn
        .createQueryBuilder(Users, 'users')
        .where('users.username = :username', { username: params.username })
        .getCount();
      if (checkUsername > 0) throw new Error('Username already exist');
      const hashPassword = await bcrypt.hash(params.password, salt);
      await this.conn
        .createQueryBuilder(Users, 'a')
        .insert()
        .values({
          username: params.username,
          password: hashPassword,
          fullname: params.fullname,
        })
        .execute();
      return 'Successfully Register';
    } catch (error) {
      throw error;
    }
  }

  async login(params: AuthDto) {
    try {
      const data = await this.conn
        .createQueryBuilder(Users, 'a')
        .where('a.username = :username', { username: params.username })
        .getOne();
      if (!data) throw new Error('Username not found');
      const checkPassword = await bcrypt.compare(
        params.password,
        data.password,
      );
      if (!checkPassword) throw new Error('Password not match');
      const payload = {
        username: data.username,
        fullname: data.fullname,
        id: data.id,
      };
      const accessToken = await this.generateToken(payload);
      return accessToken;
    } catch (error) {
      throw error;
    }
  }

  async generateToken(payload: any, exp?: string) {
    try {
      const accessToken = jwt.sign(payload, Config.get('ACCESS_TOKEN_SECRET'), {
        expiresIn: exp ? exp : Config.get('ACCESS_TOKEN_EXPIRES_IN'),
      });
      const refreshToken = jwt.sign(
        payload,
        Config.get('ACCESS_TOKEN_SECRET'),
        {
          expiresIn: Config.get('ACCESS_TOKEN_EXPIRES_IN'),
        },
      );
      const extractedToken = jwt.decode(accessToken);
      return {
        access_token: accessToken,
        refresh_token: refreshToken,
        created_at: extractedToken['iat'],
        expired_at: extractedToken['exp'],
      };
    } catch (e) {
      throw e;
    }
  }

  async getUserLogin(username: string) {
    try {
      return await this.conn
        .createQueryBuilder(Users, 'a')
        .select(['a.id', 'a.username', 'a.fullname'])
        .where('a.username = :uname', { uname: username })
        .getOne();
    } catch (e) {
      throw e;
    }
  }
}
