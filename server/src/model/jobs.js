const database = require('./database');

function createJob(revision, status) {
  return database.one(
    `INSERT INTO jobs(revision, status)
    VALUES ($1, $2)
    RETURNING *`,
    [revision, status]
  );
}

module.exports = {
  createJob,
}
