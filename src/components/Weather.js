import Component from 'src/components/Component';

class Weather extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return `<div class="weather">
      <div class="temperature">
        ${this.props.temperature}&deg;
      </div>
      <div class="overall">
        <img src="${this.props.image}" /><br/>
        ${this.props.overall}
      </div>
    </div>`;
  }
}

export default Weather;
