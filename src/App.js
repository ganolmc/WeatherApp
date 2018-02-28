import { Component } from './Facepalm';
import LocationSearch from './components/locationSearch';
import TodayForecast from './components/todayForecast.js';

class App extends Component{
	constructor(host) {
		super();
		this.state = {
			today: null,
			fourDays: null,
			city: null
		}
		this.host = host;
		this.locationSearch = new LocationSearch({
			city: this.state.city,
			onSubmit: this.onSubmit.bind(this)
		});
		this.todayForecast = new TodayForecast;
		
	}

	onSubmit(city) {
		fetch("http://api.wunderground.com/api/4fb16b2158d4827b/forecast/geolookup/conditions/q/"+city.coords.lat+","+city.coords.lng+".json")
		.then((response) => {
			if (response.status !== 200) {  
				console.log('Looks like there was a problem. Status Code: ' +  response.status);  
				return;  
			}
			response.json().then((data) => {  
				this.updateState(data, city.city);
			})
		}).catch(function(err) {  
				console.log('Fetch Error :-S', err);  
			});
	}

	updateState(data, city) {
			this.state.today = data.current_observation;
			this.state.fourDays = data.forecast.txt_forecast;
			this.state.city = city;
			this.render();
	}

	render() {
		this.todayForecast.render(this.state);
	}
	init() {
		this.host.appendChild(this.locationSearch.render());
	}
}
export default App;