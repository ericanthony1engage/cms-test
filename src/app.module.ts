import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KnexModule } from 'nestjs-knex';
import { Connection } from './config/database/connection';
import { ContentModule } from './module/content/content.module';
import { KnexProvider } from './provider/knex.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      ignoreEnvFile: false,
    }),
    KnexModule.forRootAsync({
      inject: [ConfigService],
      useFactory: Connection,
    }),
    ContentModule,
  ],
  providers: [KnexProvider],
})
export class AppModule {}
