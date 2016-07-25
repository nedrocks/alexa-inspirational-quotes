jest.unmock('../hello');

import {hello} from '../hello';
import {lambdaPromisifier} from '../../lib/lambda-promisifier';

const promisifiedHello = lambdaPromisifier(hello);

describe("hello lambda", function() {
  it("should greet the world by default", function(done) {
    promisifiedHello({})
    .then(res => {
      assert.equal(res, "Hello world!")
    })
    .then(() => done(), done);
  });

  it("should greet someone when precised", function(done) {
    promisifiedHello({name: "someone"})
    .then(res => {
      assert.equal(res, "Hello someone!")
    })
    .then(() => done(), done);
  });
});
