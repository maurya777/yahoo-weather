/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import Component from 'src/components/Component';

describe('<Component>', () => {
  it('should error on missing render', () => {
    expect((new Component).render).to.throw('render not impolemented');
  });
});
