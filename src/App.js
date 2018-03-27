import { Component } from './Facepalm';
import LocationSearch from './components/locationSearch';
import TodayForecast from './components/todayForecast';
import FourDaysForecast from './components/fourDaysForecast';
import Buttons from './components/buttons';
import HourlyForecast from './components/hourlyForecast';
import TenDays from './components/tenDays';
import { getWeather } from './utils/api';

class App extends Component {
    constructor(host) {
        super(host);
        this.state = {
            today: null,
            fourDays: null,
            hourly: null,
            tenDays: null,
            city: null,
            period: 'today',
            isFav: false
        }
        this.host = host;
        this.locationSearch = new LocationSearch({
            city: this.state.city,
            onSubmit: this.onSubmit.bind(this),
            addFavourite: this.updateFavourites
        });
        this.todayForecast = new TodayForecast;
        this.fourDaysForecast = new FourDaysForecast;
        this.hourlyForecast = new HourlyForecast;
        this.tenDays = new TenDays;
        this.buttons = new Buttons({
            onClick: this.onClick.bind(this)
        });
        this.storage = window.localStorage;
    }

    onSubmit(city) {
        getWeather(city).then((data) => {
            this.updateState(data, city.city, 'today')
        }).catch(function(err) {
            alert('Something went wrong with weather server. Try again, please', err);
        });
    }

    onClick(btn) {
        if (btn == 'Add' || 'Remove') {
            if (btn == "Add") {
                this.state.isFav == true;
            } else {
                this.state.isFav == false;
            }
            this.updateFavourites(btn);
        } else {
            this.updateState(btn);
        }

    }

    updateState(data, city, period) {
        if (!city) {
            this.state.period = data;
        } else {
            this.state.period = period;
            this.state.city = city;
            this.state.today = data.current_observation;
            this.state.fourDays = data.forecast.txt_forecast.forecastday;
            this.state.tenDays = data.forecast.simpleforecast.forecastday;
            this.state.hourly = data.hourly_forecast;
        }
        this.updateRecent(city);
        this.render();
    }

    updateRecent(city) {
        if (city) {
            let recent = this.storage.getItem("recentCities");
            let citiesArr = [];
            if (recent) {
                citiesArr = JSON.parse(recent);
                citiesArr.forEach((item, index) => {
                    if (item == city) {
                        citiesArr.splice(index, 1);
                    }
                });
                if (citiesArr.length == 10) { citiesArr.shift(); }
                citiesArr.push(city);
                this.storage.setItem("recentCities", JSON.stringify(citiesArr));
            } else {
                citiesArr.push(city);
                this.storage.setItem("recentCities", JSON.stringify(citiesArr));
            }
        }
    }

    updateFavourites(btn) {
        const { city } = this.state;
        let favorite = this.storage.getItem("favoriteCities");
        let citiesArr = [];
        if (btn == 'Add') {
            if (favorite) {
                citiesArr = JSON.parse(favorite);
                citiesArr.forEach((item, index) => {
                    if (item == city) {
                        citiesArr.splice(index, 1);
                    }
                });
                if (citiesArr.length == 10) { citiesArr.shift(); }
                citiesArr.push(city);
                this.storage.setItem("favoriteCities", JSON.stringify(citiesArr));
            } else {
                citiesArr.push(city);
                this.storage.setItem("favoriteCities", JSON.stringify(citiesArr));
            }
        } else if (btn == 'Remove') {
            citiesArr = JSON.parse(favorite);
            citiesArr.forEach((item, index) => {
                if (item == city) {
                    citiesArr.splice(index, 1);
                    this.state.isFav = false;
                    this.storage.setItem("favoriteCities", JSON.stringify(citiesArr));
                }
            });
        }
        this.render();
    }

    checkFavorite() {
        let citiesArr = this.storage.getItem('favoriteCities');
        if (citiesArr) {
            citiesArr = JSON.parse(citiesArr);
            citiesArr.forEach((item, index) => {
                if (item == this.state.city) {
                    this.state.isFav = true;
                }
            });
        }
    }

    render() {
        if (this.state.today != null) {
            this.checkFavorite();
            this.buttons.render(this.state);
        }
        switch (this.state.period) {
            case 'today':
                this.todayForecast.render(this.state);
                this.fourDaysForecast.render(this.state.fourDays);
                break;
            case 'Hourly':
                this.todayForecast.render(this.state);
                this.hourlyForecast.render(this.state.hourly);
                break;
            case '10 days':
                this.todayForecast.render(this.state);
                this.tenDays.render(this.state.tenDays);
                break;

        }

    }

    init(host) {
        host.appendChild(this.locationSearch.render());
    }
}
export default App;