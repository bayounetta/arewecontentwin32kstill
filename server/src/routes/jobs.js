const express = require('express');
const jobs = require('../model/jobs');

const router = express.Router();

// Post - create new job entry
router.post('/jobs', (request, response, next) => {
  const {
    revision,
    status
  } = request.body;

  return jobs.createJob(revision, status)
    .then((job) => {
      response.status(200).json(job);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
