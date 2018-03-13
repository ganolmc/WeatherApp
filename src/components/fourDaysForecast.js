import { Component } from '../Facepalm';

class FourDaysForecast extends Component {
	constructor(props) {
		super(props);
		this.host = this.host = document.getElementById('container');
		this.fourDays = document.createElement('div');
		this.fourDays.classList.add('container__forecast-fourDays');
	}

	render(data) {
		this.fourDays.innerHTML = '';
		let weather = data;
		for(let i = 0; i < 8; i++) {
			let iconSrc = weather[i].icon_url;
			let icon = iconSrc.replace('/k/', '/i/');
			this.fourDays.innerHTML += `
				<div class='container__forecast-fourDays-period'>	
					<div class="container__forecast-title">${weather[i].title}</div>
					<div><img src='${icon}' alt='${weather[i].icon}'></div>
					<div><span class='bold'>Pop:</span> ${weather[i].pop}%</div>
					<div>${weather[i].fcttext_metric}</div>
				</div>	
			`;
		}
		this.host.children[3].appendChild(this.fourDays);
	}
}

export default FourDaysForecast; 