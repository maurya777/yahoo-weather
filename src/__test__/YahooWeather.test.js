/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import YahooWeather from 'src/YahooWeather';

describe('<YahooWeather>', () => {
  const yahooWeather = new YahooWeather();

  describe('buildRequest()', () => {
    it('should build request properly', () => {
      const expectation = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20%28select%20woeid%20from%20geo.places%281%29%20where%20text%3D%22reston%2C%20va%22%29&format=json&env=store%3A//datatables.org/alltableswithke&';
      expect(yahooWeather.buildRequest('reston, va')).to.equal(expectation);
    });

    it('should fail to build requet for empty locations', () => {
      const error = 'no location passed to build request';
      expect(yahooWeather.buildRequest.bind(yahooWeather, '')).to.throw(error);
    });
  });

  describe('parseImageURL()', () => {
    it('should parse image url from CDATA', () => {
      const cdata = '<![CDATA[<img src="http://l.yimg.com/a/i/us/we/52/14.gif"/>\n<BR />\n<b>Current Conditions:</b>';
      expect(yahooWeather.parseImageURL(cdata)).to.equal('http://l.yimg.com/a/i/us/we/52/14.gif');
    });

    it('should fail to parse image from empty CDATA', () => {
      expect(yahooWeather.parseImageURL('')).to.be.undefined;
    });
  });

  describe('processData()', () => {
    const rawString = String.raw`{"query":{"count":1,"created":"2017-01-14T14:32:11Z","lang":"en-GB","results":{"channel":{"units":{"distance":"mi","pressure":"in","speed":"mph","temperature":"F"},"title":"Yahoo! Weather - McLean, VA, US","link":"http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-2448240/","description":"Yahoo! Weather for McLean, VA, US","language":"en-us","lastBuildDate":"Sat, 14 Jan 2017 09:32 AM EST","ttl":"60","location":{"city":"McLean","country":"United States","region":" VA"},"wind":{"chill":"32","direction":"90","speed":"7"},"atmosphere":{"humidity":"70","pressure":"1027.0","rising":"0","visibility":"16.1"},"astronomy":{"sunrise":"7:26 am","sunset":"5:10 pm"},"image":{"title":"Yahoo! Weather","width":"142","height":"18","link":"http://weather.yahoo.com","url":"http://l.yimg.com/a/i/brand/purplelogo//uh/us/news-wea.gif"},"item":{"title":"Conditions for McLean, VA, US at 08:00 AM EST","lat":"38.943562","long":"-77.194252","link":"http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-2448240/","pubDate":"Sat, 14 Jan 2017 08:00 AM EST","condition":{"code":"14","date":"Sat, 14 Jan 2017 08:00 AM EST","temp":"35","text":"Snow Showers"},"forecast":[{"code":"5","date":"14 Jan 2017","day":"Sat","high":"39","low":"33","text":"Rain And Snow"},{"code":"30","date":"15 Jan 2017","day":"Sun","high":"45","low":"34","text":"Partly Cloudy"},{"code":"28","date":"16 Jan 2017","day":"Mon","high":"40","low":"33","text":"Mostly Cloudy"},{"code":"28","date":"17 Jan 2017","day":"Tue","high":"55","low":"37","text":"Mostly Cloudy"},{"code":"39","date":"18 Jan 2017","day":"Wed","high":"60","low":"48","text":"Scattered Showers"},{"code":"30","date":"19 Jan 2017","day":"Thu","high":"54","low":"42","text":"Partly Cloudy"},{"code":"30","date":"20 Jan 2017","day":"Fri","high":"57","low":"40","text":"Partly Cloudy"},{"code":"30","date":"21 Jan 2017","day":"Sat","high":"57","low":"45","text":"Partly Cloudy"},{"code":"28","date":"22 Jan 2017","day":"Sun","high":"55","low":"42","text":"Mostly Cloudy"},{"code":"28","date":"23 Jan 2017","day":"Mon","high":"56","low":"44","text":"Mostly Cloudy"}],"description":"<![CDATA[<img src=\"http://l.yimg.com/a/i/us/we/52/14.gif\"/>\n<BR />\n<b>Current Conditions:</b>\n<BR />Snow Showers\n<BR />\n<BR />\n<b>Forecast:</b>\n<BR /> Sat - Rain And Snow. High: 39Low: 33\n<BR /> Sun - Partly Cloudy. High: 45Low: 34\n<BR /> Mon - Mostly Cloudy. High: 40Low: 33\n<BR /> Tue - Mostly Cloudy. High: 55Low: 37\n<BR /> Wed - Scattered Showers. High: 60Low: 48\n<BR />\n<BR />\n<a href=\"http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-2448240/\">Full Forecast at Yahoo! Weather</a>\n<BR />\n<BR />\n(provided by <a href=\"http://www.weather.com\" >The Weather Channel</a>)\n<BR />\n]]>","guid":{"isPermaLink":"false"}}}}}}`;
    const response = JSON.parse(rawString);
    const data = yahooWeather.processData(response.query.results);

    it('should return temperature', function () {
      expect(data.temperature).to.equal('35');
    });
    it('should return overall weather', function () {
      expect(data.overall).to.equal('Snow Showers');
    });
    it('should return city', function () {
      expect(data.city).to.equal('McLean, VA');
    });
    it('should return image url', function () {
      expect(data.image).to.equal('http://l.yimg.com/a/i/us/we/52/14.gif');
    });
    it('should return forecast', function () {
      expect(data.forecast.length).to.equal(5);
    });
    it('should return temperature unit', function () {
      expect(data.unit).to.equal('F');
    });
  });

  describe('fetchData()', () => {
    it('should return a promise', () => {
      expect(yahooWeather.fetchData('reston, va').constructor.name).to.equal('Promise');
    });
  });

  describe('render()', () => {

    before(() => {
      yahooWeather.render(document.body, 'reston, va');
    });

    after(() => {
      document.body.innerHTML = '';
    });

    it('should fail to render without a container', () => {
      const error = 'YahooWeather needs a container to render';
      expect(yahooWeather.render.bind(yahooWeather, null, 'reston, va')).to.throw(error);
    });

    it('should render', () => {
      expect(document.querySelector('.widget-wrapper')).to.not.be.null;
    });
  });
});
