/* eslint space-before-function-paren: ["error", "never"] */
/* eslint prefer-arrow-callback: 0 */
/* eslint func-names: ["error", "never"] */
/* eslint no-undef: 0 */

const expect = require('chai').expect;

describe('Test environment test', function() {
  it('should be a working test environment', function() {
    expect(true).to.equal(true);
  });
});
