import database from './database';

export function createJob(
  revision,
  author,
  mozharness,
  commands,
  task,
  taskGroup,
  build_flags
) {
  return database.one(
    `INSERT INTO jobs(revision, author, mozharness, commands, task, taskGroup, build_flags)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,
    [revision, author, mozharness, commands, task, taskGroup, build_flags]
  );
}

export function getAllJobs() {
  return database.any(
    `SELECT *
    FROM jobs`
  );
}

export function getLatestJobs() {
  return database.any(
    `SELECT *
    FROM jobs
    ORDER BY created_at DESC
    LIMIT 10`
  );
}

export function getJobById(job_id) {
  return database.one(
    `SELECT *
    FROM jobs
    WHERE id = $1`,
    [job_id]
  );
}

export function getNewJobs() {
  return database.any(
    `SELECT *
    FROM jobs
    WHERE job_status = 'new'
    ORDER BY created_at DESC`
  );
}

export function getPendingJobs() {
  return database.any(
    `SELECT *
    FROM jobs
    WHERE job_status = 'pending'
    ORDER BY created_at DESC`
  );
}

export function getCompleteJobs() {
  return database.any(
    `SELECT *
      FROM jobs
      WHERE job_status = 'complete'
      ORDER BY created_at DESC`
  );
}

export function getFailingJobs() {
  return database.any(
    `SELECT *
    FROM jobs
    WHERE job_status = 'failing'
    ORDER BY created_at DESC`
  );
}

export function getStacksForJob(job_id) {
  return database.any(
    `SELECT
      jobs.id job_id,
      stacks.id stack_id,
      jobs.created_at created_at,
      stacks.frequency frequency,
      stacks.nt_call nt_call,
      stacks.short_frames short_frames,
      stacks.long_frames long_frames
    FROM jobs
    INNER JOIN stacks
    ON jobs.id = stacks.job_id
    WHERE jobs.id = $1
    ORDER BY stacks.frequency DESC`,
    [job_id]
  );
}

export function updateJob(
  job_id,
  revision,
  author,
  mozharness,
  commands,
  task,
  job_status,
  build_flags
) {
  return database.one(
    `UPDATE jobs
    SET
      revision = $2,
      author = $3,
      mozharness = $4,
      commands = $5,
      task = $6,
      job_status = $7,
      build_flags = $8
    WHERE id = $1
    RETURNING *`,
    [
      job_id,
      revision,
      author,
      mozharness,
      commands,
      task,
      job_status,
      build_flags,
    ]
  );
}
