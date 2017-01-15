import YahooWeather from 'src/YahooWeather';
import './app.scss';

const app = new YahooWeather();
app.render(document.getElementById('widget-container-1'), 'mclean, va');
app.render(document.getElementById('widget-container-2'), 'fairfax, va');
app.render(document.getElementById('widget-container-3'), 'reston, va');
