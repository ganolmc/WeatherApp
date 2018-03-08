import { Component } from '../Facepalm';

class TodayForecast extends Component{
	constructor(props) {
		super(props);
		this.forecastContainer = document.createElement('div');
		this.forecastContainer.classList.add('container__forecast');
		this.host = document.getElementById('container');
	}

	render(data) {
		//console.log(data);
		const loc = data.city;
		const conditions = data.today.weather;
		const temperature = data.today.temp_c;
		const iconSrc = data.today.icon_url;
		const icon = iconSrc.replace('/k/', '/j/');
		const iconAlt = data.today.icon;
		const feelslike = data.today.feelslike_c;
		const precip1hr = data.today.precip_1hr_metric;
		const precipToday = data.today.precip_today_metric;
		const humidity = data.today.relative_humidity;
		const pressure = data.today.pressure_mb;
		const wind = data.today.wind_kph+", "+data.today.wind_degrees;
		this.forecastContainer.innerHTML = `
			<div class='container__forecast-city'>${loc}</div>
			<div class='container__forecast-conditions-temp'>${conditions}, ${temperature}</div>
			<div class='container__forecast-icon'><img src='${icon}' alt='${iconAlt}'></div>
			<div class='container__forecast-feelslike'>Feelslike: ${feelslike}</div>
			<div class='container__forecast-precip1hr'>1 hour precipitations: ${precip1hr}</div>
			<div class='container__forecast-precip-toady'>Today precipitations: ${precipToday}</div>
			<div class='container__forecast-humidity'>Humidity: ${humidity}</div>
			<div class='container__forecast-pressure'>Pressure: ${pressure}</div>
			<div class='container__forecast-wind'>Wind: ${wind}</div>
		`;
		this.host.appendChild(this.forecastContainer);
	}
}
export default TodayForecast; 