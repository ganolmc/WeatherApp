import { Component } from '../Facepalm';

class LocationSearch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isValid: true,
			coords: {
				lat: null,
				lng: null
			},
			city: null
		};
		this.host = document.createElement('div');
		this.host.classList.add('container__search');
		this.searchForm = document.createElement('form');
		this.searchForm.classList.add('weather-form');
		this.searchInput = document.createElement('input');
		this.searchInput.classList.add('search-weather');
		this.searchInput.setAttribute('name','search');
		this.searchButton = document.createElement('button');
		this.searchButton.classList.add('search-submit');
		this.searchButton.innerHTML = 'Get Weather';
		this.searchForm.appendChild(this.searchInput);
		this.searchForm.appendChild(this.searchButton);	
		let autocomplete = new google.maps.places.Autocomplete((this.searchInput), {
          types: [`(cities)`],
		});
		window.google.maps.event.clearInstanceListeners(this.host);
        window.google.maps.event.addListener(autocomplete, 'place_changed', this.handlePlaceChange.bind(this));
		this.host.addEventListener('submit', this.handleSubmit.bind(this));
	}

	handlePlaceChange() {
		//console.log(this);
        let geo = new google.maps.Geocoder();
        geo.geocode({
        	address: this.searchInput.value
        }, (data) => {
        	this.state.coords.lat = data[0].geometry.location.lat();
        	this.state.coords.lng = data[0].geometry.location.lng();
        	this.state.city = this.searchInput.value;
        });
	}

	updateState(nextState){
		this.state = Object.assign({}, this.state, nextState);
		this.render();
	}
	handleSubmit(e) {
		e.preventDefault();
		const city = e.target.elements.search.value.trim();
		if (!city.length) {
			this.updateState({isValid: false});
		} 
		else {
      		this.props.onSubmit(this.state);
		}

	}
	render() {
		const { isValid } = this.state;
		this.host.appendChild(this.searchForm);
		return this.host;
	}
}
export default LocationSearch; 