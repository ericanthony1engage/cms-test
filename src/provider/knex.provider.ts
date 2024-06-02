import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class KnexProvider implements OnModuleInit {
  constructor(@InjectKnex() private readonly knex: Knex) {}
  async onModuleInit(): Promise<void> {
    console.log('proceed persistence check');
    await this.knex.raw('select 1');
    console.log('proceed persistence finished');
  }
}
