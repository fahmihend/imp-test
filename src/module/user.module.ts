import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { UserController } from 'src/controller/user.controller';
import { AuthService } from 'src/service/auth.service';
import { UserService } from 'src/service/user.service';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, AuthService],
})
export class UserModule {}
