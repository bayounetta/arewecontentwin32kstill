import { Router } from 'express';
import { createJob } from '../model/jobs';

const router = Router();

// Post - create new job entry
router.post('/jobs', (request, response, next) => {
  const {
    revision,
    status
  } = request.body;

  return createJob(revision, status)
    .then((job) => {
      return response.status(200).json(job);
    })
    .catch((error) => {
      next(error);
    });
});

export default router;
