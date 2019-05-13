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
    `SELECT
      logs.id, logs.job_id, logs.created_at, stacks.frequency,
      stacks.short_frames, stacks.long_frames
    FROM logs
    INNER JOIN stacks
    ON logs.id = stacks.log_id`,
    [job_id]
  );
};

export default {
  createLog,
  getLogById,
  getLogByJobId,
};
