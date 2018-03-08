// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({11:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = function () {
	function Component(props) {
		_classCallCheck(this, Component);

		this.props = props || {};
		this.state = {};
		this.host = null;
	}

	_createClass(Component, [{
		key: 'updateState',
		value: function updateState(nextState) {
			this.state = Object.assign({}, this.state, nextState);
			this._render();
		}
	}, {
		key: 'update',
		value: function update(nextProps) {
			this.props = nextProps;
			return this._render();
		}
	}, {
		key: '_render',
		value: function _render() {
			var children = this.render();
			this.host.innerHTML = '';

			if (typeof children === 'string') {
				this.host.innerHTML = children;
			} else if (Array.isArray(children)) {
				var _host;

				(_host = this.host).append.apply(_host, _toConsumableArray(children));
			} else {
				this.host.append(children);
			}
			return this.host;
		}
	}, {
		key: 'render',
		value: function render() {}
	}]);

	return Component;
}();

exports.default = Component;
},{}],10:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Component = require('./Component');

Object.defineProperty(exports, 'Component', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_Component).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./Component":11}],12:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Facepalm = require('../Facepalm');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LocationSearch = function (_Component) {
	_inherits(LocationSearch, _Component);

	function LocationSearch(props) {
		_classCallCheck(this, LocationSearch);

		var _this = _possibleConstructorReturn(this, (LocationSearch.__proto__ || Object.getPrototypeOf(LocationSearch)).call(this, props));

		_this.state = {
			isValid: true,
			coords: {
				lat: null,
				lng: null
			},
			city: null
		};
		_this.host = document.createElement('div');
		_this.host.classList.add('container__search');
		_this.searchForm = document.createElement('form');
		_this.searchForm.classList.add('weather-form');
		_this.searchInput = document.createElement('input');
		_this.searchInput.classList.add('search-weather');
		_this.searchInput.setAttribute('name', 'search');
		_this.searchButton = document.createElement('button');
		_this.searchButton.classList.add('search-submit');
		_this.searchButton.innerHTML = 'Get Weather';
		_this.searchForm.appendChild(_this.searchInput);
		_this.searchForm.appendChild(_this.searchButton);
		var autocomplete = new google.maps.places.Autocomplete(_this.searchInput, {
			types: ['(cities)']
		});
		window.google.maps.event.clearInstanceListeners(_this.host);
		window.google.maps.event.addListener(autocomplete, 'place_changed', _this.handlePlaceChange.bind(_this));
		_this.host.addEventListener('submit', _this.handleSubmit.bind(_this));
		return _this;
	}

	_createClass(LocationSearch, [{
		key: 'handlePlaceChange',
		value: function handlePlaceChange() {
			var _this2 = this;

			//console.log(this);
			var geo = new google.maps.Geocoder();
			geo.geocode({
				address: this.searchInput.value
			}, function (data) {
				_this2.state.coords.lat = data[0].geometry.location.lat();
				_this2.state.coords.lng = data[0].geometry.location.lng();
				_this2.state.city = _this2.searchInput.value;
			});
		}
	}, {
		key: 'updateState',
		value: function updateState(nextState) {
			this.state = Object.assign({}, this.state, nextState);
			this.render();
		}
	}, {
		key: 'handleSubmit',
		value: function handleSubmit(e) {
			e.preventDefault();
			var city = e.target.elements.search.value.trim();
			if (!city.length) {
				this.updateState({ isValid: false });
			} else {
				this.props.onSubmit(this.state);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var isValid = this.state.isValid;

			this.host.appendChild(this.searchForm);
			return this.host;
		}
	}]);

	return LocationSearch;
}(_Facepalm.Component);

exports.default = LocationSearch;
},{"../Facepalm":10}],14:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Facepalm = require('../Facepalm');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TodayForecast = function (_Component) {
	_inherits(TodayForecast, _Component);

	function TodayForecast(props) {
		_classCallCheck(this, TodayForecast);

		var _this = _possibleConstructorReturn(this, (TodayForecast.__proto__ || Object.getPrototypeOf(TodayForecast)).call(this, props));

		_this.forecastContainer = document.createElement('div');
		_this.forecastContainer.classList.add('container__forecast');
		_this.host = document.getElementById('container');
		return _this;
	}

	_createClass(TodayForecast, [{
		key: 'render',
		value: function render(data) {
			//console.log(data);
			var loc = data.city;
			var conditions = data.today.weather;
			var temperature = data.today.temp_c;
			var iconSrc = data.today.icon_url;
			var icon = iconSrc.replace('/k/', '/j/');
			var iconAlt = data.today.icon;
			var feelslike = data.today.feelslike_c;
			var precip1hr = data.today.precip_1hr_metric;
			var precipToday = data.today.precip_today_metric;
			var humidity = data.today.relative_humidity;
			var pressure = data.today.pressure_mb;
			var wind = data.today.wind_kph + ", " + data.today.wind_degrees;
			this.forecastContainer.innerHTML = '\n\t\t\t<div class=\'container__forecast-city\'>' + loc + '</div>\n\t\t\t<div class=\'container__forecast-conditions-temp\'>' + conditions + ', ' + temperature + '</div>\n\t\t\t<div class=\'container__forecast-icon\'><img src=\'' + icon + '\' alt=\'' + iconAlt + '\'></div>\n\t\t\t<div class=\'container__forecast-feelslike\'>Feelslike: ' + feelslike + '</div>\n\t\t\t<div class=\'container__forecast-precip1hr\'>1 hour precipitations: ' + precip1hr + '</div>\n\t\t\t<div class=\'container__forecast-precip-toady\'>Today precipitations: ' + precipToday + '</div>\n\t\t\t<div class=\'container__forecast-humidity\'>Humidity: ' + humidity + '</div>\n\t\t\t<div class=\'container__forecast-pressure\'>Pressure: ' + pressure + '</div>\n\t\t\t<div class=\'container__forecast-wind\'>Wind: ' + wind + '</div>\n\t\t';
			this.host.appendChild(this.forecastContainer);
		}
	}]);

	return TodayForecast;
}(_Facepalm.Component);

exports.default = TodayForecast;
},{"../Facepalm":10}],13:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Facepalm = require('../Facepalm');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FourDaysForecast = function (_Component) {
	_inherits(FourDaysForecast, _Component);

	function FourDaysForecast(props) {
		_classCallCheck(this, FourDaysForecast);

		var _this = _possibleConstructorReturn(this, (FourDaysForecast.__proto__ || Object.getPrototypeOf(FourDaysForecast)).call(this, props));

		_this.forecastContainer = document.createElement('div');
		_this.forecastContainer.classList.add('container__forecast-wraapper');
		_this.host = document.getElementById('container');
		return _this;
	}

	_createClass(FourDaysForecast, [{
		key: 'render',
		value: function render(data) {
			var weather = data.forecastday;
			for (var i = 0; i < weather.length; i++) {
				var periodWeather = document.createElement('div');
				var iconSrc = weather[i].icon_url;
				var icon = iconSrc.replace('/k/', '/j/');
				var iconAlt = weather[i].icon;
				periodWeather.classList.add('container__forecast-period');
				periodWeather.innerHTML = '\n\t\t\t<div>' + weather[i].title + '</div>\n\t\t\t<div><img src=\'' + icon + '\' alt=\'' + iconAlt + '\'></div>\n\t\t\t<div>Pop: ' + weather[i].pop + '</div>\n\t\t\t<div>' + weather[i].fcttext_metric + '</div>\n\t\t\t<hr><br>\n\t\t\t';
				this.forecastContainer.appendChild(periodWeather);
			}
			this.host.appendChild(this.forecastContainer);
		}
	}]);

	return FourDaysForecast;
}(_Facepalm.Component);

exports.default = FourDaysForecast;
},{"../Facepalm":10}],19:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Facepalm = require('../Facepalm');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Buttons = function (_Component) {
	_inherits(Buttons, _Component);

	function Buttons(props) {
		_classCallCheck(this, Buttons);

		var _this = _possibleConstructorReturn(this, (Buttons.__proto__ || Object.getPrototypeOf(Buttons)).call(this, props));

		_this.state = {
			btn: null
		};
		_this.btns = document.createElement('div');
		_this.btns.classList.add('btns');
		_this.host = document.getElementById('container');
		var btnNames = ['Hourly', '10 days'];
		btnNames.forEach(function (item, i, btnsNames) {
			var btn = document.createElement('button');
			btn.innerHTML = item;
			_this.btns.appendChild(btn);
		});
		_this.btns.addEventListener('click', _this.handleClick.bind(_this));
		return _this;
	}

	_createClass(Buttons, [{
		key: 'handleClick',
		value: function handleClick(e) {
			if (e.target.tagName == 'BUTTON') {
				this.updateState(e.target.innerHTML);
			}
		}
	}, {
		key: 'updateState',
		value: function updateState(btn) {
			this.state.btn = btn;
			this.onClick();
		}
	}, {
		key: 'onClick',
		value: function onClick() {
			this.props.onClick(this.state.btn);
		}
	}, {
		key: 'render',
		value: function render() {
			this.host.appendChild(this.btns);
		}
	}]);

	return Buttons;
}(_Facepalm.Component);

exports.default = Buttons;
},{"../Facepalm":10}],9:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Facepalm = require('../Facepalm');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_Component) {
	_inherits(Login, _Component);

	function Login(props) {
		_classCallCheck(this, Login);

		return _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));
	}

	_createClass(Login, [{
		key: 'render',
		value: function render() {
			console.log('sdsdsd');
		}
	}]);

	return Login;
}(_Facepalm.Component);

exports.default = Login;
},{"../Facepalm":10}],6:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _Login = require('./components/Login');

var _Login2 = _interopRequireDefault(_Login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = [{
	component: _App2.default,
	href: '/'
}, {
	component: _Login2.default,
	href: '/login'
}];

exports.default = routes;
},{"./App":8,"./components/Login":9}],5:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Facepalm = require('./Facepalm');

var _routes = require('./routes');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Router = function (_Component) {
	_inherits(Router, _Component);

	function Router(host, routes) {
		_classCallCheck(this, Router);

		var _this = _possibleConstructorReturn(this, (Router.__proto__ || Object.getPrototypeOf(Router)).call(this, host, routes));

		_this.state = {
			routes: routes,
			currentComponent: null
		};

		_this.host = host;
		_this.routes = routes;
		window.addEventListener("hashchange", _this.handleUrlChange.bind(_this));
		var app = new _App2.default();
		app.init(_this.host);
		//console.log(app);
		return _this;
	}

	_createClass(Router, [{
		key: 'handleUrlChange',
		value: function handleUrlChange() {
			for (var i = 0; i < this.routes.length; i++) {
				if (this.routes[i].href != this.state.currentComponent) {
					this.updateState(this.routes[i].href);
				}
			}
		}
	}, {
		key: 'updateState',
		value: function updateState(s) {
			this.state.currentComponent = s;
			console.log(this.state);
		}
	}, {
		key: 'render',
		value: function render() {}
	}, {
		key: 'path',
		get: function get() {
			return window.location.hash.slice(1);
		}
	}]);

	return Router;
}(_Facepalm.Component);

exports.default = Router;
},{"./Facepalm":10,"./routes":6,"./App":8}],8:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Facepalm = require('./Facepalm');

var _locationSearch = require('./components/locationSearch');

var _locationSearch2 = _interopRequireDefault(_locationSearch);

var _todayForecast = require('./components/todayForecast');

var _todayForecast2 = _interopRequireDefault(_todayForecast);

var _fourDaysForecast = require('./components/fourDaysForecast');

var _fourDaysForecast2 = _interopRequireDefault(_fourDaysForecast);

var _buttons = require('./components/buttons');

var _buttons2 = _interopRequireDefault(_buttons);

var _Router = require('./Router');

var _Router2 = _interopRequireDefault(_Router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
	_inherits(App, _Component);

	function App(host) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, host));

		_this.state = {
			today: null,
			fourDays: null,
			city: null,
			coords: {
				lat: null,
				lng: null
			}
		};
		_this.host = host;
		_this.locationSearch = new _locationSearch2.default({
			city: _this.state.city,
			onSubmit: _this.onSubmit.bind(_this)
		});
		_this.todayForecast = new _todayForecast2.default();
		_this.fourDaysForecast = new _fourDaysForecast2.default();
		_this.buttons = new _buttons2.default({
			onClick: _this.onClick.bind(_this)
		});
		return _this;
	}

	_createClass(App, [{
		key: 'onSubmit',
		value: function onSubmit(city) {
			var _this2 = this;

			this.updateState(city);
			fetch("http://api.wunderground.com/api/4fb16b2158d4827b/forecast/geolookup/conditions/q/" + city.coords.lat + "," + city.coords.lng + ".json").then(function (response) {
				if (response.status !== 200) {
					console.log('Looks like there was a problem. Status Code: ' + response.status);
					return;
				}
				response.json().then(function (data) {
					_this2.updateState(data, city.city);
				});
			}).catch(function (err) {
				console.log('Fetch Error :-S', err);
			});
		}
	}, {
		key: 'onClick',
		value: function onClick(btn) {
			//console.log(btn, this);
		}
	}, {
		key: 'updateState',
		value: function updateState(data, city) {
			if (!city) {
				console.log(data);
			} else {
				this.state.today = data.current_observation;
				this.state.fourDays = data.forecast.txt_forecast;
				this.state.city = city;
				this.render();
			}
		}
	}, {
		key: 'render',
		value: function render() {
			if (this.state.today != null) {
				this.buttons.render(this.state);
			}
			this.todayForecast.render(this.state);
			this.fourDaysForecast.render(this.state.fourDays);
		}
	}, {
		key: 'init',
		value: function init(host) {
			host.appendChild(this.locationSearch.render());
		}
	}]);

	return App;
}(_Facepalm.Component);

exports.default = App;
},{"./Facepalm":10,"./components/locationSearch":12,"./components/todayForecast":14,"./components/fourDaysForecast":13,"./components/buttons":19,"./Router":5}],2:[function(require,module,exports) {
"use strict";

var _App = require("./src/App");

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _App2.default();

app.init(document.getElementById("container"));
},{"./src/App":8}],20:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '58993' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[20,2])
//# sourceMappingURL=/dist/WeatherApp1.map