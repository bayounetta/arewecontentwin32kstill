import database from './database';

const createLog = (job_id) => {
  return database.one(
    `INSERT INTO logs (job_id)
    VALUES ($1)
    RETURNING *`,
    [job_id]
  );
};

const getLogById = (log_id) => {
  return database.one(
    `SELECT *
    FROM logs
    WHERE id = $1`,
    [log_id]
  );
};

const getLogByJobId = (job_id) => {
  return database.any(
    `SELECT *
    FROM logs
    WHERE job_id = $1`,
    [job_id]
  );
};

export default {
  createLog,
  getLogById,
  getLogByJobId,
};
