/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import WeatherWidget from 'src/components/WeatherWidget';
import render from 'src/util/render';

describe('<WeatherWidget>', () => {

  describe('shows loading', function () {
    const widget = new WeatherWidget();

    before(() => {
      render(widget, document.body);
    });

    after(() => {
      document.body.innerHTML = '';
    });

    it('should render loading', () => {
      expect(document.querySelector('.widget').innerHTML.indexOf('Loading')).to.not.equal(-1);
    });

  });

  describe('shows error', function () {
    const widget = new WeatherWidget({error: true});

    before(() => {
      render(widget, document.body);
    });

    after(() => {
      document.body.innerHTML = '';
    });

    it('should render error', () => {
      expect(document.querySelector('.widget').innerHTML.indexOf('Error fetching weather data :(')).to.not.equal(-1);
    });

  });

  describe('shows widget', function () {
    const props = {
      city: 'Fairfax, VA',
      temperature: 50,
      overall: 'cloudy',
      image: 'test.jpg',
      forecast: [
        {day: 'Fri', high: '50', low: '35'},
        {day: 'Sat', high: '55', low: '40'}
      ]
    };
    const widget = new WeatherWidget(props);

    before(() => {
      render(widget, document.body);
    });

    after(() => {
      document.body.innerHTML = '';
    });

    it('should not render error', () => {
      expect(document.querySelector('.widget').innerHTML.indexOf('Error fetching weather data :(')).to.equal(-1);
    });

    it('should not render loading', () => {
      expect(document.querySelector('.widget').innerHTML.indexOf('Loading')).to.equal(-1);
    });

    it('should render city', () => {
      expect(document.querySelectorAll('.city').length).to.equal(1);
    });

    it('should render weather', () => {
      expect(document.querySelectorAll('.weather').length).to.equal(1);
    });

    it('should render forecast', () => {
      expect(document.querySelectorAll('.forecast').length).to.equal(1);
    });
  });
});
