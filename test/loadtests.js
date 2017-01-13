'use strict';

require('babel-polyfill');
require('core-js/fn/object/assign');

before(() => {
});

beforeEach(() => {
});


function requireAll(context) {
  return context.keys().forEach(context);
}

// Add support for all files in the test directory
const testsContext = requireAll(require.context('.', true, /\.test\.js$/));

const srcContext = requireAll(require.context('../src', true, /\.test\.js$/));
