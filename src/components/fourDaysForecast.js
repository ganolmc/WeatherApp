import { Component } from '../Facepalm';

class FourDaysForecast extends Component {
	constructor(props) {
		super(props);
		this.forecastContainer = document.createElement('div');
		this.forecastContainer.classList.add('container__forecast-wraapper');
		this.host = document.getElementById('container');
	}

	render(data) {
		const weather = data.forecastday;
		for(let i = 0; i < weather.length; i++) {
			const periodWeather = document.createElement('div');
			const iconSrc = weather[i].icon_url;
			const icon = iconSrc.replace('/k/', '/j/');
			const iconAlt = weather[i].icon
			periodWeather.classList.add('container__forecast-period');
			periodWeather.innerHTML = `
			<div>${weather[i].title}</div>
			<div><img src='${icon}' alt='${iconAlt}'></div>
			<div>Pop: ${weather[i].pop}</div>
			<div>${weather[i].fcttext_metric}</div>
			<hr><br>
			`;
			this.forecastContainer.appendChild(periodWeather);
		}
		this.host.appendChild(this.forecastContainer);
	}
}

export default FourDaysForecast; 