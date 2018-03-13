import { Component } from '../Facepalm';

class TodayForecast extends Component{
	constructor(props) {
		super(props);
		this.forecastContainer = document.createElement('div');
		this.forecastContainer.classList.add('container__forecast');
		this.host = document.getElementById('container');
	}

	render(data) {
		this.forecastContainer.innerHTML = '';
		let loc = data.city;
		let conditions = data.today.weather;
		let temperature = data.today.temp_c;
		let iconSrc = data.today.icon_url;
		let icon = iconSrc.replace('/k/', '/i/');
		let iconAlt = data.today.icon;
		let feelslike = data.today.feelslike_c;
		let precip1hr = data.today.precip_1hr_metric;
		let precipToday = data.today.precip_today_metric;
		let humidity = data.today.relative_humidity;
		let pressure = data.today.pressure_mb;
		let wind = data.today.wind_kph+"km/h. <span class='bold'>Direction:</span> "+data.today.wind_dir;
		this.forecastContainer.innerHTML = `
			<div class='container__forecast-today'>
				<div class='container__forecast-city'><h2><i class="fas fa-map-marker"></i> ${loc}</h2></div>
				<div class="container__forecast-wrapper-conditions">
					<div class="container__forecast-wrapper-left">
						<div class='container__forecast-conditions-temp'><span class='bold'>${conditions}, ${temperature}&deg;C</span></div>
						<div class='container__forecast-feelslike'><span class="bold">Feelslike:</span> ${feelslike}&deg;C</div>
					</div>
					<div class='container__forecast-icon'><img src='${icon}' alt='${iconAlt}'></div>
				</div>		
				<div class='container__forecast-precip1hr'><span class="bold">1 hour precipitations:</span> ${precip1hr}mm</div>
				<div class='container__forecast-precip-toady'><span class="bold">Today precipitations:</span> ${precipToday}mm</div>
				<div class='container__forecast-humidity'><span class="bold">Humidity:</span> ${humidity}</div>
				<div class='container__forecast-pressure'><span class="bold">Pressure:</span> ${pressure}mb</div>
				<div class='container__forecast-wind'><span class="bold">Wind:</span> ${wind}</div>
			</div>
		`;
		this.host.appendChild(this.forecastContainer);
	}
}
export default TodayForecast; 