import Component from 'src/components/Component';
import Weather from 'src/components/Weather';
import Forecast from 'src/components/Forecast';
import 'src/styles/main.scss';

class WeatherWidget extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  renderCity() {
    return `<div class="city">${this.props.city}</div>`;
  }

  renderWeather() {
    return (new Weather(this.props)).render();
  }

  renderForecast() {
    return (new Forecast(this.props)).render();
  }

  render() {
    if (this.props) {
      if (this.props.error) {
        return `<div class="widget-wrapper">
          <div class="widget">
          Error fetching weather data :(
          </div>
        </div>`;
      } else {
        return `<div class="widget-wrapper">
          <div class="widget">
            ${this.renderCity()}
            ${this.renderWeather()}
            ${this.renderForecast()}
          </div>
        </div>`;
      }
    } else {
      return `<div class="widget-wrapper">
        <div class="widget">
        Loading...
        </div>
      </div>`;
    }
  }
}

export default WeatherWidget;
