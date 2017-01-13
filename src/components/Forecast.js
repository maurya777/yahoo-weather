import Component from 'src/components/Component';

class Forecast extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return `<div class="forecast">
      ${
        this.props.forecast.reduce((prev, next) => {
          return prev
          +
          `<div class="day">
            <div class="day-of-week">
            ${next.day}
            </div>
            <div class="range">
              <div class="high">${next.high}&deg;</div>/
              <div class="low">${next.low}&deg;</div>
            </div>
          </div>`;
        }, '')
      }
    </div>`;
  }
}

export default Forecast;
