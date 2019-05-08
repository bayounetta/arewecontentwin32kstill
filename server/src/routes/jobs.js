import { Router } from 'express';
import jobs from '../model/jobs';
import logs from '../model/logs';

const router = Router();

// Post - create new job entry
router.post('/', (request, response, next) => {
  const { revision, status } = request.body;

  return jobs
    .createJob(revision, status)
    .then((job) => {
      return response.status(201).json(job);
    })
    .catch((error) => {
      next(error);
    });
});

// Get - retrieve all job entries
router.get('/', (request, response, next) => {
  return jobs
    .getAllJobs()
    .then((jobs) => {
      return response.status(200).json(jobs);
    })
    .catch((error) => {
      next(error);
    });
});

// Get - retrieve latest ten jobs
router.get('/latest', (request, response, next) => {
  return jobs
    .getLatestJobs()
    .then((jobs) => {
      return response.status(200).json(jobs);
    })
    .catch((error) => {
      next(error);
    });
});

// Get - retrieve all jobs with status new
router.get('/new', (request, response, next) => {
  return jobs
    .getNewJobs()
    .then((jobs) => {
      return response.status(200).json(jobs);
    })
    .catch((error) => {
      next(error);
    });
});

// Get - retrieve all jobs with status pending
router.get('/pending', (request, repsonse, next) => {
  return jobs
    .getPendingJobs()
    .then((jobs) => {
      return response.status(200).json(jobs);
    })
    .catch((error) => {
      next(error);
    });
});

// Get - retrieve all jobs with status completed
router.get('/completed', (request, response, next) => {
  return jobs
    .getCompletedJobs()
    .then((jobs) => {
      return response.status(200).json(jobs);
    })
    .catch((error) => {
      next(error);
    });
});

// Get - retrieve job by job's id
router.get('/:id', (request, response, next) => {
  const job_id = request.params.id;

  return jobs
    .getJobById(job_id)
    .then((jobs) => {
      return response.status(200).json(jobs);
    })
    .catch((error) => {
      if (error.code === 0) {
        return response
          .status(404)
          .json({ note: `job ${job_id} not found in the database` });
      }
      next(error);
    });
});

// Put - update job by job's id
router.put('/:id', (request, response, next) => {
  const job_id = request.params.id;
  const { status, build_flags } = request.body;

  if (!status || !build_flags) {
    return response
      .status(400)
      .json({ note: `missing status or build_flags in request body` });
  }

  return jobs
    .updateJob(job_id, status, build_flags)
    .then((job) => {
      return response.status(200).json(job);
    })
    .catch((error) => {
      next(error);
    });
});

// Get - retrieve corresponding log for job by job's id
router.get('/:id/log', (request, response, next) => {
  const job_id = request.params.id;

  return logs
    .getLogByJobId(job_id)
    .then((log) => {
      return response.status(200).json(log);
    })
    .catch((error) => {
      next(error);
    });
});

export default router;
