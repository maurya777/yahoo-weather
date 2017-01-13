/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import Weather from 'src/components/Weather';
import render from 'src/util/render';

describe('<Weather>', () => {
  const props = {temperature: 50, overall: 'cloudy', image: 'test.jpg'};
  const weather = new Weather(props);

  before(() => {
    render(weather, document.body);
  });

  after(() => {
    document.body.innerHTML = '';
  });

  it('should render temperature', () => {
    expect(document.querySelector('.temperature').innerHTML.indexOf('50')).to.not.equal(-1);
  });

  it('should render overall info', () => {
    expect(document.querySelector('.overall').innerHTML.indexOf('cloudy')).to.not.equal(-1);
  });

  it('should render image', () => {
    expect(document.querySelector('.overall>img').src.indexOf('test.jpg')).to.not.equal(-1);
  });
});
