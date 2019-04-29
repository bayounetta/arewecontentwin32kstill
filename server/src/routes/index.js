const express = require('express');
const jobs = require('./jobs');

const router = express.Router();

router.get('/api/', (request, response) => {
  response.send({ express: 'Hello From Express' });
});

router.use('/api/jobs', jobs);

module.exports = router;
