import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { AuthController } from 'src/controller/auth.controller';
import { AuthService } from 'src/service/auth.service';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
