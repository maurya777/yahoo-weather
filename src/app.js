import YahooWeather from 'src/YahooWeather';
import './app.scss';

const app = new YahooWeather();
app.render(document.getElementById('widget-container'));
