import { Router } from 'express';
import jobs from './jobs';

const router = Router();

router.get('/', (request, response) => {
  return response.status(200).send({ note: `you've reached the api!` });
});

router.use('/jobs', jobs);

export default router;
