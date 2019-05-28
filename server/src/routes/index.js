import { Router } from 'express';
import jobs from './jobs';

const router = Router();

router.get('/api/', (request, response) => {
  return response.status(200).send({ note: `you've reached the api!` });
});

router.use('/api/jobs', jobs);

export default router;
