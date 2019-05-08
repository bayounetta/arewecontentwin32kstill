import database from './database';

const createJob = (test_tag, build_tag) => {
  return database.one(
    `INSERT INTO jobs(test_tag, build_tag)
    VALUES ($1, $2)
    RETURNING *`,
    [test_tag, build_tag]
  );
};

const getAllJobs = () => {
  return database.any(
    `SELECT *
    FROM jobs`
  );
};

const getLatestJobs = () => {
  return database.any(
    `SELECT *
    FROM jobs
    ORDER BY created_at ASC
    LIMIT 10`
  );
};

const getJobById = (job_id) => {
  return database.one(
    `SELECT *
    FROM jobs
    WHERE id = $1`,
    [job_id]
  );
};

const getNewJobs = () => {
  return database.any(
    `SELECT *
    FROM jobs
    WHERE job_status = 'new'`
  );
};

const getPendingJobs = () => {
  return database.any(
    `SELECT *
    FROM jobs
    WHERE job_status = 'pending'`
  );
};

const getCompletedJobs = () => {
  return database.any(
    `SELECT *
      FROM jobs
      WHERE job_status = 'completed'`
  );
};

const updateJob = (job_id, status, build_flags) => {
  return database.one(
    `UPDATE jobs
    SET status = $1, build_flags = $2
    WHERE id = $3`,
    [job_id, status, build_flags]
  );
};

export default {
  createJob,
  getAllJobs,
  getLatestJobs,
  getJobById,
  getNewJobs,
  getPendingJobs,
  getCompletedJobs,
  updateJob,
};
