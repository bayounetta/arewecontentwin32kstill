import path from 'path';
import { expect } from 'chai';
import {
  truncateDatabase,
  seedDatabase,
  truncateTable,
} from '../utilities/database.utilities';

import { createStack, getStacksByJobId } from '../../model/stacks';

describe('stacks database model', function() {
  describe('createStack function', function() {
    it('should be a function', function() {
      expect(createStack).to.be.a('function');
    });
  });

  describe('getStacksByJobId function', function() {
    it('should be a function', function() {
      expect(getStacksByJobId).to.be.a('function');
    });
  });
});
