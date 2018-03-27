import { Component } from '../Facepalm';
import { coords } from '../utils/api.js';

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
        this.searchInput.setAttribute('name', 'search');
        this.searchButton = document.createElement('button');
        this.searchButton.classList.add('search-submit');
        this.searchButton.innerHTML = 'Get Weather';
        this.searchError = document.createElement('div');
        this.searchError.classList.add('form-error');
        this.recent = document.createElement('div');
        this.recent.classList.add('recent');
        this.recent.innerHTML = `<button>Recent</button>`;
        this.favorites = document.createElement('div');
        this.favorites.classList.add('favorites');
        this.favorites.innerHTML = `<button>Favorites</button>`;
        this.btnWrapper = document.createElement('div');
        this.btnWrapper.classList.add('btn-wrapper');
        this.btnWrapper.appendChild(this.recent);
        this.btnWrapper.appendChild(this.favorites);
        this.searchForm.appendChild(this.searchInput);
        this.searchForm.appendChild(this.searchButton);
        this.searchForm.appendChild(this.searchError);
        let autocomplete = new google.maps.places.Autocomplete((this.searchInput), {
            types: [`(cities)`],
        });
        window.google.maps.event.clearInstanceListeners(this.host);
        window.google.maps.event.addListener(autocomplete, 'place_changed', this.handlePlaceChange.bind(this));
        this.host.addEventListener('submit', this.handleSubmit.bind(this));
        this.btnWrapper.addEventListener('click', this.onClickBtnsWrapper.bind(this));
    }

    handlePlaceChange() {
        this.searchInput.classList.remove('invalid');
        coords(this.searchInput.value).then((coords) => {
            this.state.coords.lat = coords[0];
            this.state.coords.lng = coords[1];
        });
        this.state.city = this.searchInput.value;
    }

    onClickBtnsWrapper(e) {
        let storage = window.localStorage;
        let citiesArr = [];
        if (e.target.innerHTML == 'Recent') {
            citiesArr = storage.getItem("recentCities");
            if (citiesArr) {
                citiesArr = JSON.parse(citiesArr);
            }
        } else if (e.target.innerHTML == 'Favorites') {
            citiesArr = storage.getItem("favoriteCities");
            if (citiesArr) {
                citiesArr = JSON.parse(citiesArr);
            }
        }
        const citiesList = document.createElement('div');
        for (let i = 1; i < citiesArr.length; i++) {
            let city = document.createElement('div');
            city.innerHTML = `<a href=''>${citiesArr[i]}</a>`;
            citiesList.appendChild(city);
        }
        this.btnWrapper.appendChild(citiesList);
        console.log(e.target.innerHTML);
    }
    updateState(nextState) {
        this.state = Object.assign({}, this.state, nextState);
        this.render();
    }
    handleSubmit(e) {
        e.preventDefault();
        const city = e.target.elements.search.value.trim();
        if (!city.length) {
            this.updateState({ isValid: false });
            this.searchError.innerHTML = `
				<p class='error'>It seems, that you didn't enter anything</p>
			`;
            this.searchInput.classList.add('invalid');
        } else if (this.state.city == null) {
            this.updateState({ isValid: false });
            this.searchError.innerHTML = `
				<p class='error'>Please, choose location from dropdown</p>
			`;
            this.searchInput.classList.add('invalid');
        } else {
            this.searchError.innerHTML = '';
            setTimeout(this.props.onSubmit(this.state), 1000);
        }

    }
    render() {
        const { isValid } = this.state;
        this.host.appendChild(this.searchForm);
        this.host.appendChild(this.btnWrapper);
        return this.host;
    }
}
export default LocationSearch;