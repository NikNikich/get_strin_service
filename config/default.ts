// noinspection SpellCheckingInspection
module.exports = {
  version: '0.0.1',
  jwt: {
    expiresIn: 3600000,
    secret: 'JwtSecretString',
  },
  swagger: {
    enable: true,
    path: 'swagger',
  },
  db: {
    migrations: [
      './src/typeorm/migrations/*.ts',
      './src/typeorm/migrations/*.js',
    ],
  },
};
