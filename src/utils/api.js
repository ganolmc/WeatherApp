export const getWeather = city => {
  return fetch("http://api.wunderground.com/api/4fb16b2158d4827b//forecast/conditions/hourly/forecast10day/q/"+city.coords.lat+","+city.coords.lng+".json").then(res => {
    if (!res.ok) {
      console.log('Looks like there was a problem. Status Code: ' +  response.status);  
		return;
    }
    return res.json();
  });
};

export const coords = location => {
	return new Promise((resolve, reject) => {
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            address: location
        }, function (result) {
            let lat = result[0].geometry.location.lat();
            let lng = result[0].geometry.location.lng();
            resolve([lat, lng]);
        });
	})
}