import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { entity } from 'src/entity';
import { Config } from 'src/helper/config.helper';

export const typeOrmConfig = {
  type: 'mysql',
  host: Config.get('DB_HOST'),
  port: Config.getNumber('DB_PORT'),
  username: Config.get('DB_USERNAME'),
  password: Config.get('DB_PASSWORD'),
  database: Config.get('DB_DATABASE'),
  entities: [...entity],
  logging: false,
  synchronize: true,
} as TypeOrmModuleOptions;
