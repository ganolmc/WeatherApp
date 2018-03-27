import { Component } from '../Facepalm';
class TenDays extends Component{
	constructor(props) {
		super(props);
		this.host = document.getElementById('container');
		this.tenDays = document.createElement('div');
		this.tenDays.classList.add('container__forecast-tenDays');
	}
	render(weather) {
		this.tenDays.innerHTML = '';
		for (let i = 0; i < weather.length; i++) {
			let iconSrc = weather[i].icon_url;
			let icon = iconSrc.replace('/k/', '/i/');
			this.tenDays.innerHTML += `
				<div class='container__daily-each'>	
					<div class="container__forecast-title">${weather[i].date.weekday}, ${weather[i].date.monthname} ${weather[i].date.day}</div>
					<div class="container__forecast-wrapper-conditions">
						<div class="container__forecast-wrapper-left">
							<div class='container__forecast-conditions-temp'>${weather[i].conditions}
							<div><span class='bold'>High:</span> ${weather[i].high.celsius}&deg;C, <span class='bold'>Low:</span> ${weather[i].low.celsius}&deg;</div>
							</div>
						</div>
						<div class='container__forecast-icon'><img src='${icon}' alt='${weather[i].conditions}'></div>
					</div>
					<div><span class='bold'>Pop:</span> ${weather[i].pop}%</div>
					<div><span class='bold'>Quantitative Precipitation Forecasts:</span> ${weather[i].qpf_allday.mm}mm</div>
					<div><span class='bold'>Average humidity: ${weather[i].avehumidity}%</div>
					<div><span class='bold'>Average wind:</span> ${weather[i].avewind.kph}km/h. <span class='bold'>Direction:</span> ${weather[i].avewind.dir} </div>
				</div>
			`;
		}
		this.host.children[3].appendChild(this.tenDays);
	}	
};

export default TenDays; 