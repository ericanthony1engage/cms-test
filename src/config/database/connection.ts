import { ConfigService } from '@nestjs/config';
import { KnexModuleOptions } from 'nestjs-knex';

export const Connection = (
  configService: ConfigService,
): KnexModuleOptions | Promise<KnexModuleOptions> => ({
  config: {
    client: 'pg',
    connection: {
      host: configService.get<string>('DB_HOST'),
      user: configService.get<string>('DB_USER'),
      password: configService.get<string>('DB_PASS'),
      database: configService.get<string>('DB_NAME'),
      port: configService.get<number>('DB_PORT)'),
    },
    debug: configService.get<boolean>('DB_DEBUG'),
    migrations: {
      directory: 'src/migration',
    },
  },
});
