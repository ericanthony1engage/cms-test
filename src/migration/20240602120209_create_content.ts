import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await knex.schema.createTable('content', (table: Knex.CreateTableBuilder) => {
    table.bigIncrements('id');
    table.uuid('public_id').defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('file').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable('content');
}
