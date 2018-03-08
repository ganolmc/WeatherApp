import { Component } from './Facepalm';
import LocationSearch from './components/locationSearch';
import TodayForecast from './components/todayForecast';
import FourDaysForecast from './components/fourDaysForecast';
import Buttons from './components/buttons';
import Router from './Router';


class App extends Component{
	constructor(host) {
		super(host);
		this.state = {
			today: null,
			fourDays: null,
			city: null,
			coords: {
				lat: null,
				lng: null
			}
		}
		this.host = host;
		this.locationSearch = new LocationSearch({
			city: this.state.city,
			onSubmit: this.onSubmit.bind(this)
		});
		this.todayForecast = new TodayForecast;
		this.fourDaysForecast = new FourDaysForecast; 
		this.buttons = new Buttons({
			onClick: this.onClick.bind(this)
		});
	}

	onSubmit(city) {
		this.updateState(city);
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

	onClick(btn) {
		//console.log(btn, this);
	}

	updateState(data, city) {
		if(!city) {console.log(data)}
		else {	
			this.state.today = data.current_observation;
			this.state.fourDays = data.forecast.txt_forecast;
			this.state.city = city;
			this.render();
		}
	}

	render() {
		if(this.state.today != null){
			this.buttons.render(this.state);
		}
		this.todayForecast.render(this.state);
		this.fourDaysForecast.render(this.state.fourDays);

	}
	init(host) {
		host.appendChild(this.locationSearch.render());
	}
}
export default App;