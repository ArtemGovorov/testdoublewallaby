import {expect} from 'chai';
import td from 'testdouble';

describe('demo tests', () => {

  afterEach(() => {
    td.reset();
  })

  it('should pass with alias and alias', () => {
    const x = td.replace('sheep').tester;
    td.when(x()).thenReturn('foo');
    const tester = require('sheep').tester;
    expect(tester()).to.equal('foo');
  });
});
