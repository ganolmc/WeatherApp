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
})({16:[function(require,module,exports) {
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
},{}],15:[function(require,module,exports) {
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
},{"./Component":16}],14:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getWeather = exports.getWeather = function getWeather(city) {
  return fetch("http://api.wunderground.com/api/4fb16b2158d4827b//forecast/conditions/hourly/forecast10day/q/" + city.coords.lat + "," + city.coords.lng + ".json").then(function (res) {
    if (!res.ok) {
      console.log('Looks like there was a problem. Status Code: ' + response.status);
      return;
    }
    return res.json();
  });
};

var coords = exports.coords = function coords(location) {
  return new Promise(function (resolve, reject) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      address: location
    }, function (result) {
      var lat = result[0].geometry.location.lat();
      var lng = result[0].geometry.location.lng();
      resolve([lat, lng]);
    });
  });
};
},{}],10:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Facepalm = require('../Facepalm');

var _api = require('../utils/api.js');

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
		_this.searchError = document.createElement('div');
		_this.searchError.classList.add('form-error');
		_this.searchForm.appendChild(_this.searchInput);
		_this.searchForm.appendChild(_this.searchButton);
		_this.searchForm.appendChild(_this.searchError);
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

			this.searchInput.classList.remove('invalid');
			(0, _api.coords)(this.searchInput.value).then(function (coords) {
				_this2.state.coords.lat = coords[0];
				_this2.state.coords.lng = coords[1];
			});
			this.state.city = this.searchInput.value;
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
				this.searchError.innerHTML = '\n\t\t\t\t<p class=\'error\'>It seems, that you didn\'t enter anything</p>\n\t\t\t';
				this.searchInput.classList.add('invalid');
			} else if (this.state.city == null) {
				this.updateState({ isValid: false });
				this.searchError.innerHTML = '\n\t\t\t\t<p class=\'error\'>Please, choose location from dropdown</p>\n\t\t\t';
				this.searchInput.classList.add('invalid');
			} else {
				this.searchError.innerHTML = '';
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
},{"../Facepalm":15,"../utils/api.js":14}],9:[function(require,module,exports) {
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
			this.forecastContainer.innerHTML = '';
			var loc = data.city;
			var conditions = data.today.weather;
			var temperature = data.today.temp_c;
			var iconSrc = data.today.icon_url;
			var icon = iconSrc.replace('/k/', '/i/');
			var iconAlt = data.today.icon;
			var feelslike = data.today.feelslike_c;
			var precip1hr = data.today.precip_1hr_metric;
			var precipToday = data.today.precip_today_metric;
			var humidity = data.today.relative_humidity;
			var pressure = data.today.pressure_mb;
			var wind = data.today.wind_kph + "km/h. <span class='bold'>Direction:</span> " + data.today.wind_dir;
			this.forecastContainer.innerHTML = '\n\t\t\t<div class=\'container__forecast-today\'>\n\t\t\t\t<div class=\'container__forecast-city\'><h2><i class="fas fa-map-marker"></i> ' + loc + '</h2></div>\n\t\t\t\t<div class="container__forecast-wrapper-conditions">\n\t\t\t\t\t<div class="container__forecast-wrapper-left">\n\t\t\t\t\t\t<div class=\'container__forecast-conditions-temp\'><span class=\'bold\'>' + conditions + ', ' + temperature + '&deg;C</span></div>\n\t\t\t\t\t\t<div class=\'container__forecast-feelslike\'><span class="bold">Feelslike:</span> ' + feelslike + '&deg;C</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\'container__forecast-icon\'><img src=\'' + icon + '\' alt=\'' + iconAlt + '\'></div>\n\t\t\t\t</div>\t\t\n\t\t\t\t<div class=\'container__forecast-precip1hr\'><span class="bold">1 hour precipitations:</span> ' + precip1hr + 'mm</div>\n\t\t\t\t<div class=\'container__forecast-precip-toady\'><span class="bold">Today precipitations:</span> ' + precipToday + 'mm</div>\n\t\t\t\t<div class=\'container__forecast-humidity\'><span class="bold">Humidity:</span> ' + humidity + '</div>\n\t\t\t\t<div class=\'container__forecast-pressure\'><span class="bold">Pressure:</span> ' + pressure + 'mb</div>\n\t\t\t\t<div class=\'container__forecast-wind\'><span class="bold">Wind:</span> ' + wind + '</div>\n\t\t\t</div>\n\t\t';
			this.host.appendChild(this.forecastContainer);
		}
	}]);

	return TodayForecast;
}(_Facepalm.Component);

exports.default = TodayForecast;
},{"../Facepalm":15}],8:[function(require,module,exports) {
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

		_this.host = _this.host = document.getElementById('container');
		_this.fourDays = document.createElement('div');
		_this.fourDays.classList.add('container__forecast-fourDays');
		return _this;
	}

	_createClass(FourDaysForecast, [{
		key: 'render',
		value: function render(data) {
			this.fourDays.innerHTML = '';
			var weather = data;
			for (var i = 0; i < 8; i++) {
				var iconSrc = weather[i].icon_url;
				var icon = iconSrc.replace('/k/', '/i/');
				this.fourDays.innerHTML += '\n\t\t\t\t<div class=\'container__forecast-fourDays-period\'>\t\n\t\t\t\t\t<div class="container__forecast-title">' + weather[i].title + '</div>\n\t\t\t\t\t<div><img src=\'' + icon + '\' alt=\'' + weather[i].icon + '\'></div>\n\t\t\t\t\t<div><span class=\'bold\'>Pop:</span> ' + weather[i].pop + '%</div>\n\t\t\t\t\t<div>' + weather[i].fcttext_metric + '</div>\n\t\t\t\t</div>\t\n\t\t\t';
			}
			this.host.children[3].appendChild(this.fourDays);
		}
	}]);

	return FourDaysForecast;
}(_Facepalm.Component);

exports.default = FourDaysForecast;
},{"../Facepalm":15}],13:[function(require,module,exports) {
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
			btn.classList.add('btns__btn');
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
			this.onClick(this.state.btn);
		}
	}, {
		key: 'onClick',
		value: function onClick(btn) {
			this.props.onClick(btn);
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
},{"../Facepalm":15}],11:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Facepalm = require('../Facepalm');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HourlyForecast = function (_Component) {
	_inherits(HourlyForecast, _Component);

	function HourlyForecast(props) {
		_classCallCheck(this, HourlyForecast);

		var _this = _possibleConstructorReturn(this, (HourlyForecast.__proto__ || Object.getPrototypeOf(HourlyForecast)).call(this, props));

		_this.host = document.getElementById('container');
		_this.hourly = document.createElement('div');
		_this.hourly.classList.add('container__forecast-hourly');
		return _this;
	}

	_createClass(HourlyForecast, [{
		key: 'render',
		value: function render(weather) {
			this.hourly.innerHTML = '';
			for (var i = 0; i < weather.length; i++) {
				var iconSrc = weather[i].icon_url;
				var icon = iconSrc.replace('/k/', '/i/');
				this.hourly.innerHTML += '\n\t\t\t\t<div class=\'container__hourly-each\'>\n\t\t\t\t\t<div class="container__forecast-title">' + weather[i].FCTTIME.hour + ':' + weather[i].FCTTIME.min + ', ' + weather[i].FCTTIME.weekday_name + ', ' + weather[i].FCTTIME.month_name + ' ' + weather[i].FCTTIME.mday + ' </div>\n\t\t\t\t\t<div class="container__forecast-wrapper-conditions">\n\t\t\t\t\t\t<div class="container__forecast-wrapper-left">\n\t\t\t\t\t\t\t<div class=\'container__forecast-conditions-temp\'>' + weather[i].condition + ', ' + weather[i].temp.metric + '&deg;C</div>\n\t\t\t\t\t\t\t<div class=\'container__forecast-feelslike\'><span class="bold">Feelslike:</span> ' + weather[i].feelslike.metric + '&deg;C</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\'container__forecast-icon\'><img src=\'' + icon + '\' alt=\'' + weather[i].condition + '\'></div>\n\t\t\t\t\t</div>\t\n\t\t\t\t\t<div><span class=\'bold\'>Humidity:</span> ' + weather[i].humidity + '%</div>\n\t\t\t\t\t<div><span class=\'bold\'>Pressure:</span> ' + weather[i].mslp.metric + 'mb</div>\n\t\t\t\t\t<div><span class=\'bold\'>Wind:</span> ' + weather[i].wspd.metric + 'km/h. <span class=\'bold\'>Direction:</span> ' + weather[i].wdir.dir + '</div>\n\t\t\t\t</div>\t\n\t\t\t';
			}
			this.host.children[3].appendChild(this.hourly);
		}
	}]);

	return HourlyForecast;
}(_Facepalm.Component);

;

exports.default = HourlyForecast;
},{"../Facepalm":15}],12:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Facepalm = require('../Facepalm');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TenDays = function (_Component) {
	_inherits(TenDays, _Component);

	function TenDays(props) {
		_classCallCheck(this, TenDays);

		var _this = _possibleConstructorReturn(this, (TenDays.__proto__ || Object.getPrototypeOf(TenDays)).call(this, props));

		_this.host = document.getElementById('container');
		_this.tenDays = document.createElement('div');
		_this.tenDays.classList.add('container__forecast-tenDays');
		return _this;
	}

	_createClass(TenDays, [{
		key: 'render',
		value: function render(weather) {
			this.tenDays.innerHTML = '';
			for (var i = 0; i < weather.length; i++) {
				var iconSrc = weather[i].icon_url;
				var icon = iconSrc.replace('/k/', '/i/');
				this.tenDays.innerHTML += '\n\t\t\t\t<div class=\'container__daily-each\'>\t\n\t\t\t\t\t<div class="container__forecast-title">' + weather[i].date.weekday + ', ' + weather[i].date.monthname + ' ' + weather[i].date.day + '</div>\n\t\t\t\t\t<div class="container__forecast-wrapper-conditions">\n\t\t\t\t\t\t<div class="container__forecast-wrapper-left">\n\t\t\t\t\t\t\t<div class=\'container__forecast-conditions-temp\'>' + weather[i].conditions + ', <span class=\'bold\'>High:</span> ' + weather[i].high.celsius + '&deg;C, <span class=\'bold\'>Low:</span> ' + weather[i].low.celsius + '&deg;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\'container__forecast-icon\'><img src=\'' + icon + '\' alt=\'' + weather[i].conditions + '\'></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div><span class=\'bold\'>Pop:</span> ' + weather[i].pop + '%</div>\n\t\t\t\t\t<div><span class=\'bold\'>Quantitative Precipitation Forecasts:</span> ' + weather[i].qpf_allday.mm + 'mm</div>\n\t\t\t\t\t<div><span class=\'bold\'>Average humidity: ' + weather[i].avehumidity + '%</div>\n\t\t\t\t\t<div><span class=\'bold\'>Average wind:</span> ' + weather[i].avewind.kph + 'km/h. <span class=\'bold\'>Direction:</span> ' + weather[i].avewind.dir + ' </div>\n\t\t\t\t</div>\n\t\t\t';
			}
			this.host.children[3].appendChild(this.tenDays);
		}
	}]);

	return TenDays;
}(_Facepalm.Component);

;

exports.default = TenDays;
},{"../Facepalm":15}],6:[function(require,module,exports) {
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

var _hourlyForecast = require('./components/hourlyForecast');

var _hourlyForecast2 = _interopRequireDefault(_hourlyForecast);

var _tenDays = require('./components/tenDays');

var _tenDays2 = _interopRequireDefault(_tenDays);

var _api = require('./utils/api');

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
			hourly: null,
			tenDays: null,
			city: null,
			period: 'today'
		};
		_this.host = host;
		_this.locationSearch = new _locationSearch2.default({
			city: _this.state.city,
			onSubmit: _this.onSubmit.bind(_this)
		});
		_this.todayForecast = new _todayForecast2.default();
		_this.fourDaysForecast = new _fourDaysForecast2.default();
		_this.hourlyForecast = new _hourlyForecast2.default();
		_this.tenDays = new _tenDays2.default();
		_this.buttons = new _buttons2.default({
			onClick: _this.onClick.bind(_this)
		});
		return _this;
	}

	_createClass(App, [{
		key: 'onSubmit',
		value: function onSubmit(city) {
			var _this2 = this;

			(0, _api.getWeather)(city).then(function (data) {
				_this2.updateState(data, city.city, 'today');
			}).catch(function (err) {
				alert('Fetch Error :-S', err);
			});
		}
	}, {
		key: 'onClick',
		value: function onClick(btn) {
			this.updateState(btn);
		}
	}, {
		key: 'updateState',
		value: function updateState(data, city, period) {
			if (!city) {
				this.state.period = data;
			} else {
				//console.log(data);
				this.state.period = period;
				this.state.city = city;
				this.state.today = data.current_observation;
				this.state.fourDays = data.forecast.txt_forecast.forecastday;
				this.state.tenDays = data.forecast.simpleforecast.forecastday;
				this.state.hourly = data.hourly_forecast;
			}
			this.render();
		}
	}, {
		key: 'render',
		value: function render() {
			if (this.state.today != null) {
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
	}, {
		key: 'init',
		value: function init(host) {
			host.appendChild(this.locationSearch.render());
		}
	}]);

	return App;
}(_Facepalm.Component);

exports.default = App;
},{"./Facepalm":15,"./components/locationSearch":10,"./components/todayForecast":9,"./components/fourDaysForecast":8,"./components/buttons":13,"./components/hourlyForecast":11,"./components/tenDays":12,"./utils/api":14}],3:[function(require,module,exports) {
"use strict";

var _App = require("./src/App");

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _App2.default();

app.init(document.getElementById("container"));
},{"./src/App":6}],32:[function(require,module,exports) {

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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '62028' + '/');
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
},{}]},{},[32,3])
//# sourceMappingURL=/dist/WeatherApp1.map