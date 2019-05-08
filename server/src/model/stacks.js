import database from './database';

const createStack = (log_id, frequency, frames) => {
  return database.one(
    `INSERT INTO stacks (log_id, frequency, frames)
    VALUES ($1, $2, $3)`,
    [log_id, frequency, frames]
  );
};

const getStacksByLogId = (log_id) => {
  return database.any(
    `SELECT *
    FROM stacks
    WHERE log_id = $1
    ORDER BY frequency DESC`,
    [log_id]
  );
};

export default {
  createStack,
  getStacksByLogId,
};
