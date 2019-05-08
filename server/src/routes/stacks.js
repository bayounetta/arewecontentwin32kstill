import { Router } from 'express';
import stacks from '../model/stacks';

const router = Router();

// Post - create a stack entry
router.post('/', (request, response, next) => {
  const { log_id, frequency, frames } = request.body;

  return stacks
    .createStack(log_id, frequency, frames)
    .then((stack) => {
      return response.status(201).json(stack);
    })
    .catch((error) => {
      next(error);
    });
});

export default router;
