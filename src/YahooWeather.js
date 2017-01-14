import renderer from 'src/util/render';
import Widget from 'src/components/Widget';
import xhr from 'src/util/xhr';

class YahooWeather {
  static MAX_FORECAST_DAYS = 5;

  constructor() {
    this.data = null;
  }

  setData(data) {
    this.data = data;
    this.refresh();
  }

  buildRequest() {
    const API = 'https://query.yahooapis.com/v1/public/yql';
    const query = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="maclean, va")';
    const store = 'store://datatables.org/alltableswithke';
    const options = {
      q: escape(query),
      format: 'json',
      env: escape(store)
    };
    return API + Object.keys(options).reduce((prev, next)=>{
      return `${prev}${next}=${options[next]}&`;
    }, '?');
  }

  parseImageURL(data) {
    const [,url] = data.split('"');
    return url;
  }

  processData(results) {
    const {
      item: {
        condition: {temp, text},
        description,
        forecast
      },
      location,
      units
    } = results.channel;

    return {
      temperature: temp,
      overall    : text,
      city       : `${location.city}, ${location.region}`,
      image      : this.parseImageURL(description),
      forecast   : forecast.slice(0,YahooWeather.MAX_FORECAST_DAYS),
      unit       : units.temperature
    };
  }

  processError() {
    console.warn('Unable to fetch data from Yahoo Weather'); /*eslint no-console: 0*/
  }

  fetchData() {
    xhr.send({
      method: 'GET',
      url: this.buildRequest()
    })
    .then((data) => {
      const {responseText: {query: {results}}} = data;
      if (results) {
        this.setData(this.processData(results));
      } else {
        this.setData({error: true});
      }
    })
    .catch((error) => {
      this.setData({error});
    });
  }

  render(container) {
    if (container) {
      this.container = container;
    }

    if (!this.data) {
      this.fetchData();
    }
    renderer(new Widget(), this.container);
  }

  refresh() {
    renderer(new Widget(this.data), this.container);
  }

}

export default YahooWeather;
