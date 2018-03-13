import { Component } from './Facepalm';
import LocationSearch from './components/locationSearch';
import TodayForecast from './components/todayForecast';
import FourDaysForecast from './components/fourDaysForecast';
import Buttons from './components/buttons';
import HourlyForecast from './components/hourlyForecast';
import TenDays from './components/tenDays';
import { getWeather } from './utils/api';

class App extends Component{
	constructor(host) {
		super(host);
		this.state = {
			today: null,
			fourDays: null,
			hourly: null,
			tenDays: null,
			city: null,
			period: 'today'
		}
		this.host = host;
		this.locationSearch = new LocationSearch({
			city: this.state.city,
			onSubmit: this.onSubmit.bind(this)
		});
		this.todayForecast = new TodayForecast;
		this.fourDaysForecast = new FourDaysForecast; 
		this.hourlyForecast = new HourlyForecast;
		this.tenDays = new TenDays;
		this.buttons = new Buttons({
			onClick: this.onClick.bind(this)
		});
	}

	onSubmit(city) {
		getWeather(city).then((data) => {
			this.updateState(data, city.city, 'today')
		}).catch(function(err) {  
			alert('Fetch Error :-S', err);  
		});
	}

	onClick(btn) {
		this.updateState(btn);
	}

	updateState(data, city, period) {
		if(!city) {
			this.state.period = data;
		}
		else {
			//console.log(data);
			this.state.period = period;
			this.state.city = city;
			this.state.today = data.current_observation;
			this.state.fourDays = data.forecast.txt_forecast.forecastday;
			this.state.tenDays = data.forecast.simpleforecast.forecastday;
			this.state.hourly = data.hourly_forecast;
		}
			this.render();
	}

	render() {
		if(this.state.today != null){
			this.buttons.render(this.state);
		}
		switch(this.state.period) {
			case 'today':
				this.todayForecast.render(this.state);
				this.fourDaysForecast.render(this.state.fourDays);
				break;
			case 'Hourly':
				this.todayForecast.render(this.state);
				this.hourlyForecast.render(this.state.hourly);
				break;
			case '10 days':
				this.todayForecast.render(this.state);
				this.tenDays.render(this.state.tenDays);
				break;

		}

	}

	init(host) {
		host.appendChild(this.locationSearch.render());
	}
}
export default App;