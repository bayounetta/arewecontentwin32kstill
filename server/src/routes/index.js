import { Router } from 'express';
import jobs from './jobs';

const router = Router();

router.get('/api/', (request, response) => {
  return response.send({ express: 'Hello From Express' });
});

router.use('/api/jobs', jobs);

export default router;
