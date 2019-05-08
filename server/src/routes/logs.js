import { Router } from 'express';
import logs from '../model/logs';
import stacks from '../model/stacks';

const router = Router();

// Post - create a log entry
router.post('/', (request, response, next) => {
  const { job_id } = request.body;

  return logs
    .createLog(job_id)
    .then((log) => {
      return response.status(201).json(log);
    })
    .catch((error) => {
      next(error);
    });
});

// Get - retrieve a log by log's id
router.get('/:id', (request, response, next) => {
  const log_id = request.params.id;

  return logs
    .createLog(log_id)
    .then((log) => {
      return response.status(200).json(log);
    })
    .catch((error) => {
      next(error);
    });
});

// Get - retrieve a log's stacks
router.get('/:id/stacks', (request, response, next) => {
  const log_id = request.params.id;

  return stacks
    .getStacksByLogId(log_id)
    .then((stacks) => {
      return response.status(200).json(stacks);
    })
    .catch((error) => {
      next(error);
    });
});

export default router;
