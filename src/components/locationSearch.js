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
        this.recent.innerHTML = `<button class="btns__btn">Recent</button>`;
        this.favorites = document.createElement('div');
        this.favorites.classList.add('favorites');
        this.favorites.innerHTML = `<button class="btns__btn">Favorites</button>`;
        this.btnWrapper = document.createElement('div');
        this.btnWrapper.classList.add('btn-wrapper');
        this.btnWrapper.appendChild(this.recent);
        this.btnWrapper.appendChild(this.favorites);
        this.searchForm.appendChild(this.searchInput);
        this.searchForm.appendChild(this.searchButton);
        this.searchForm.appendChild(this.searchError);
        this.citiesList = document.createElement('div');
        this.citiesList.classList.add('btns-wrapper__cities-list');
        this.citiesList.addEventListener('click', this.onClickCitiesList.bind(this));
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
            this.citiesList.innerHTML = '';
            this.citiesList.innerHTML = `
            <p class='btn-wrapper__list-title'>${e.target.innerHTML} cities:</p>
        `;
            citiesArr = storage.getItem("recentCities");
            if (citiesArr) {
                citiesArr = JSON.parse(citiesArr);
            }
        } else if (e.target.innerHTML == 'Favorites') {
            this.citiesList.innerHTML = '';
            this.citiesList.innerHTML = `
            <p class='btn-wrapper__list-title'>${e.target.innerHTML} cities:</p>
        `;
            citiesArr = storage.getItem("favoriteCities");
            if (citiesArr) {
                citiesArr = JSON.parse(citiesArr);
            }
        }

        for (let i = 0; i < citiesArr.length; i++) {
            let city = document.createElement('div');
            city.classList.add('btns-wrapper__cities-list-item');
            city.innerHTML = `<a href='' class='btns-wrapper__cities-list-link' data-lat=${citiesArr[i].lat} data-lng=${citiesArr[i].lng}>${citiesArr[i].city}</a>`;
            this.citiesList.appendChild(city);
        }
        
        this.btnWrapper.appendChild(this.citiesList);
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

    onClickCitiesList(e) {
        e.preventDefault();
        this.state.city = e.target.innerHTML;
        this.state.coords.lat = e.target.dataset.lat;
        this.state.coords.lng = e.target.dataset.lng;
        this.citiesList.innerHTML = '';
        setTimeout(this.props.onSubmit(this.state), 1000);
    }

    render() {
        const { isValid } = this.state;
        this.host.appendChild(this.searchForm);
        this.host.appendChild(this.btnWrapper);
        return this.host;
    }
}
export default LocationSearch;