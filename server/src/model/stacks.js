import database from './database';

export function createStack(
  job_id,
  frequency,
  nt_call,
  short_frames,
  long_frames
) {
  return database.one(
    `INSERT INTO stacks (job_id, frequency, nt_call, short_frames, long_frames)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [job_id, frequency, nt_call, short_frames, long_frames]
  );
}
