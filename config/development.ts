// noinspection SpellCheckingInspection
module.exports = {
  server: {
    port: 3002,
    url: 'http://localhost',
    back: 'https://tlcamp-api.tlcamp.nikkin.site',
  },
  swagger: {
    server: '/',
  },
  db: {
    port: '6811',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'get_string',
    synchronize: true,
    migrationsRun: true,
    logging: false,
    ssl: false,
  },
};
