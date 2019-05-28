import path from 'path';
import { expect } from 'chai';
import {
  truncateDatabase,
  seedDatabase,
  truncateTable,
} from '../utilities/database.utilities';

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
} from '../../model/jobs';

describe('jobs database model', function() {
  const job = {
    id: 1,
    revision: '-',
    author: '-',
    mozharness: '-',
    commands: '-',
    task: 'e6FZdLQbTHajlcDx5PIAQQ',
    job_status: 'new',
    build_flags: 'none',
    created_at: '',
  };

  describe('createJob function', function() {
    let returnedJob = {};

    before(function() {
      return truncateDatabase()
        .then(function() {
          return seedDatabase(
            path.join(process.cwd(), 'src/database/seed.sql')
          );
        })
        .then(function() {
          return createJob(job.task);
        })
        .then(function(queryResult) {
          returnedJob = queryResult;
        })
        .catch(function(error) {
          console.error(error);
        });
    });

    it('should be a function', function() {
      expect(createJob).to.be.a('function');
    });

    it('should add a job to the database', function() {
      // we don't care about what these fields actually are
      job.id = returnedJob.id;
      job.created_at = returnedJob.created_at;
      expect(returnedJob).to.deep.equal(job);
    });
  });

  describe('getAllJobs function', function() {
    it('should be a function', function() {
      expect(getAllJobs).to.be.a('function');
    });
  });

  describe('getLatestJobs function', function() {
    it('should be a function', function() {
      expect(getLatestJobs).to.be.a('function');
    });
  });

  describe('getJobById function', function() {
    it('should be a function', function() {
      expect(getJobById).to.be.a('function');
    });
  });

  describe('getNewJobs function', function() {
    it('should be a function', function() {
      expect(getNewJobs).to.be.a('function');
    });
  });

  describe('getPendingJobs function', function() {
    it('should be a function', function() {
      expect(getPendingJobs).to.be.a('function');
    });
  });

  describe('getCompleteJobs function', function() {
    it('should be a function', function() {
      expect(getCompleteJobs).to.be.a('function');
    });
  });

  describe('getFailingJobs function', function() {
    it('should be a function', function() {
      expect(getFailingJobs).to.be.a('function');
    });
  });

  describe('getStacksForJob function', function() {
    it('should be a function', function() {
      expect(getStacksForJob).to.be.a('function');
    });
  });

  describe('updateJob function', function() {
    it('should be a function', function() {
      expect(updateJob).to.be.a('function');
    });
  });
});
