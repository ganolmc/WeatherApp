import { Component } from '../Facepalm';

class Buttons extends Component{
	constructor(props) {
		super(props);
		this.state = {
			btn: null	
		};
		this.btns = document.createElement('div');
		this.btns.classList.add('btns');
		this.host = document.getElementById('container');
		let btnNames = ['Hourly', '10 days'];
		btnNames.forEach((item, i, btnsNames) => {
			let btn = document.createElement('button');
			btn.classList.add('btns__btn');
			btn.innerHTML = item;
			this.btns.appendChild(btn);
		});
		this.btns.addEventListener('click', this.handleClick.bind(this))
	}
	handleClick(e) {
		if(e.target.tagName == 'BUTTON'){
			this.updateState(e.target.innerHTML);
		}
	}
	updateState(btn){
		this.state.btn = btn;
		this.onClick(this.state.btn);
	}
	onClick(btn){
		this.props.onClick(btn);
	}
	render() {
		this.host.appendChild(this.btns);
	}
}

export default Buttons; 