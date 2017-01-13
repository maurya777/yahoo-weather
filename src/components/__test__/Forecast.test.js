/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import Forecast from 'src/components/Forecast';
import render from 'src/util/render';

describe('<Forecast()>', () => {
  const props = {forecast: [
    {day: 'Fri', high: '50', low: '35'},
    {day: 'Sat', high: '55', low: '40'}
  ]};
  const forecast = new Forecast(props);

  before(() => {
    render(forecast, document.body);
  });

  after(() => {
    document.body.innerHTML = '';
  });

  it('should render two days', () => {
    expect(document.querySelectorAll('.forecast .day').length).to.be.equal(2);
  });

  it('should render day of week', () => {
    expect(document.querySelector('.forecast .day .day-of-week').innerHTML.indexOf('Fri')).to.not.equal(-1);
  });

  it('should render high', () => {
    expect(document.querySelector('.forecast .day .high').innerHTML.indexOf('50')).to.not.equal(-1);
  });

  it('should render low', () => {
    expect(document.querySelector('.forecast .day .low').innerHTML.indexOf('35')).to.not.equal(-1);
  });
});
