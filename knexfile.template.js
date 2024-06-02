// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: '',
      user: '',
      password: '',
      port: '5432',
    },
    migrations: {
      directory: 'src/migration',
    },
  },
};
