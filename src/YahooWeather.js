import renderer from 'src/util/render';
import Widget from 'src/components/Widget';
import XHRPromise from 'xhr-promise';

class YahooWeather {
  static MAX_FORECAST_DAYS = 5;

  buildRequest(location) {
    if (!location || location.length === 0) {
      throw new Error('no location passed to build request');
    }
    const API = 'https://query.yahooapis.com/v1/public/yql';
    const query = `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${location}")`;
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
      city       : `${location.city},${location.region}`,
      image      : this.parseImageURL(description),
      forecast   : forecast.slice(0,YahooWeather.MAX_FORECAST_DAYS),
      unit       : units.temperature
    };
  }

  fetchData(location) {
    return new Promise((resolve, reject) => {
      const xhr = new XHRPromise();
      xhr.send({
        method: 'GET',
        url: this.buildRequest(location)
      })
      .then((data) => {
        const {responseText: {query: {results}}} = data;
        if (results) {
          resolve(this.processData(results));
        } else {
          reject();
        }
      })
      .catch(() => {
        reject();
      });
    });
  }

  render(container, location) {
    if (!container) {
      throw new Error('YahooWeather needs a container to render');
    }
    const widget = new Widget();
    this.fetchData(location).then((data)=>{
      widget.props = data;
      renderer(widget, container);
    })
    .catch(() => {
      widget.props = {error: true};
      renderer(widget, container);
    });
    renderer(widget, container);
  }
}

export default YahooWeather;
