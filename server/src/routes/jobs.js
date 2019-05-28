import { Router } from 'express';
import { get } from 'request';
import {
  createJob,
  getAllJobs,
  getLatestJobs,
  getJobById,
  getNewJobs,
  getPendingJobs,
  getCompleteJobs,
  getFailingJobs,
  getStacksForJob,
  updateJob,
} from '../model/jobs';
import { createStack } from '../model/stacks';

const router = Router();

// Post - create new job entry
router.post('/', (request, response, next) => {
  const { task } = request.body;

  get(
    `https://queue.taskcluster.net/v1/task/${task}`,
    (err, res, taskConfig) => {
      if (err) {
        console.log('Error:', err);
      } else if (res.statusCode !== 200) {
        return response.status(400).json({ note: `task ${task} not found` });
      } else {
        taskConfig = JSON.parse(taskConfig);
        if (taskConfig.tags.os !== 'windows') {
          return response
            .status(400)
            .json({ note: `task ${task} is not a windows task` });
        }

        return createJob(
          taskConfig.metadata.description.split('(')[2].split(')')[0],
          taskConfig.metadata.owner,
          '', // mozharness
          taskConfig.payload.command.join(' '),
          taskConfig.taskGroupId,
          task,
          '' // build_flags
        )
          .then((job) => {
            return response.status(201).json(job);
          })
          .catch((error) => {
            next(error);
          });
      }
    }
  );
});

// Get - retrieve all job entries
router.get('/', (request, response, next) => {
  return getAllJobs()
    .then((jobs) => {
      return response.status(200).json(jobs);
    })
    .catch((error) => {
      next(error);
    });
});

// Get - retrieve latest ten jobs
router.get('/latest', (request, response, next) => {
  return getLatestJobs()
    .then((jobs) => {
      return response.status(200).json(jobs);
    })
    .catch((error) => {
      next(error);
    });
});

// Get - retrieve all jobs with status new
router.get('/new', (request, response, next) => {
  return getNewJobs()
    .then((jobs) => {
      return response.status(200).json(jobs);
    })
    .catch((error) => {
      next(error);
    });
});

// Get - retrieve all jobs with status pending
router.get('/pending', (request, response, next) => {
  return getPendingJobs()
    .then((jobs) => {
      return response.status(200).json(jobs);
    })
    .catch((error) => {
      next(error);
    });
});

// Get - retrieve all jobs with status complete
router.get('/complete', (request, response, next) => {
  return getCompleteJobs()
    .then((jobs) => {
      return response.status(200).json(jobs);
    })
    .catch((error) => {
      next(error);
    });
});

// Get - retrieve all jobs with status
router.get('/failing', (request, response, next) => {
  return getFailingJobs()
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

  return getJobById(job_id)
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
  const {
    revision,
    author,
    mozharness,
    commands,
    task,
    job_status,
    build_flags,
  } = request.body;

  if (
    !revision ||
    !author ||
    !mozharness ||
    !commands ||
    !task ||
    !job_status ||
    !build_flags
  ) {
    return response
      .status(400)
      .json({ note: `missing variables in request body` });
  }

  return updateJob(
    job_id,
    revision,
    author,
    mozharness,
    commands,
    task,
    job_status,
    build_flags
  )
    .then((job) => {
      return response.status(200).json(job);
    })
    .catch((error) => {
      next(error);
    });
});

// Post - create a new stack entry
router.post('/:id/stacks', (request, response, next) => {
  const job_id = request.params.id;
  const { frequency, nt_call, short_frames, long_frames } = request.body;

  if (!frequency || !nt_call || !short_frames || !long_frames) {
    return response
      .status(400)
      .json({ note: `missing variables in request body` });
  }

  return createStack(job_id, frequency, nt_call, short_frames, long_frames)
    .then((stack) => {
      return response.status(201).json(stack);
    })
    .catch((error) => {
      next(error);
    });
});

// Get - retrieve corresponding log for job by job's id
router.get('/:id/stacks', (request, response, next) => {
  const job_id = request.params.id;

  return getStacksForJob(job_id)
    .then((stack) => {
      return response.status(200).json(stack);
    })
    .catch((error) => {
      next(error);
    });
});

// Get - retrieve stack by stack's id
router.get('/:job_id/stacks/:stack_id', (request, response, next) => {
  const { stack_id } = request.params;

  return getStackById(stack_id)
    .then((stack) => {
      return response.status(200).json(stack);
    })
    .catch((error) => {
      next(error);
    });
});

export default router;
