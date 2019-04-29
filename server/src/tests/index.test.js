/* eslint space-before-function-paren: ["error", "never"] */
/* eslint prefer-arrow-callback: 0 */
/* eslint func-names: ["error", "never"] */
/* eslint no-undef: 0 */

import { expect } from 'chai';

describe('Test environment test', function() {
  it('should be a working test environment', function() {
    return expect(true).to.equal(true);
  });
});
