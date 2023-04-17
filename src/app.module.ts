import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth.module';
import { UserModule } from './module/user.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
