import { Component } from '../Facepalm';
class HourlyForecast extends Component{
	constructor(props) {
		super(props);
		this.host = document.getElementById('container');
		this.hourly = document.createElement('div');
		this.hourly.classList.add('container__forecast-hourly');
	}
	render(weather) {
		this.hourly.innerHTML = '';
		for (let i = 0; i < weather.length; i++) {
			let iconSrc = weather[i].icon_url;
			let icon = iconSrc.replace('/k/', '/i/');
			this.hourly.innerHTML += `
				<div class='container__hourly-each'>
					<div class="container__forecast-title">${weather[i].FCTTIME.hour}:${weather[i].FCTTIME.min}, ${weather[i].FCTTIME.weekday_name}, ${weather[i].FCTTIME.month_name} ${weather[i].FCTTIME.mday} </div>
					<div class="container__forecast-wrapper-conditions">
						<div class="container__forecast-wrapper-left">
							<div class='container__forecast-conditions-temp'>${weather[i].condition}, ${weather[i].temp.metric}&deg;C</div>
							<div class='container__forecast-feelslike'><span class="bold">Feelslike:</span> ${weather[i].feelslike.metric}&deg;C</div>
						</div>
						<div class='container__forecast-icon'><img src='${icon}' alt='${weather[i].condition}'></div>
					</div>	
					<div><span class='bold'>Humidity:</span> ${weather[i].humidity}%</div>
					<div><span class='bold'>Pressure:</span> ${weather[i].mslp.metric}mb</div>
					<div><span class='bold'>Wind:</span> ${weather[i].wspd.metric}km/h. <span class='bold'>Direction:</span> ${weather[i].wdir.dir}</div>
				</div>	
			`;
		}
		this.host.children[3].appendChild(this.hourly);
	}	
};

export default HourlyForecast; 