import { Router } from 'express';
import jobs from './jobs';
import logs from './logs';
import stacks from './stacks';

const router = Router();

router.get('/api/', (request, response) => {
  return response.status(200).send({ note: `you've reached the api!` });
});

router.use('/api/jobs', jobs);
router.use('/api/logs', logs);
router.use('/api/stacks', stacks);

export default router;
