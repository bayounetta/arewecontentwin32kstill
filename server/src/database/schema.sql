DROP TABLE IF EXISTS jobs CASCADE;
CREATE TYPE status_t AS ENUM ('new', 'pending', 'complete', 'failing');
CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  revision VARCHAR(256) DEFAULT '-',
  author VARCHAR(128) DEFAULT '-',
  mozharness VARCHAR (512) DEFAULT '-',
  commands VARCHAR (512) DEFAULT '-',
  task VARCHAR(64) NOT NULL,
  taskGroup VARCHAR(64) NOT NULL,
  job_status status_t DEFAULT 'new',
  build_flags VARCHAR(256) DEFAULT 'none',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TABLE IF EXISTS stacks CASCADE;
CREATE TABLE stacks (
  id SERIAL PRIMARY KEY,
  job_id INTEGER REFERENCES jobs(id) NOT NULL,
  frequency SMALLINT DEFAULT 1,
  nt_call VARCHAR(128) NOT NULL,
  short_frames VARCHAR(10240) NOT NULL,
  long_frames VARCHAR(10240) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
