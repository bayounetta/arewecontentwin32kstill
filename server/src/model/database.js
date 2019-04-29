const pgPromise = require('pg-promise');

const pgp = pgPromise({});

module.exports = pgp(
  process.env.DATABASE_URL || 'postgres://localhost:5432/awcw32ky'
);
