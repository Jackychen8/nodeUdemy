/* Section 4*/ //Async

// Lecture 26 Asnyc Basics
setTimeout( () => {
	console.log('Inside of callback');
}, 2000);

// if 0 ms, it doesn't actually run immediately



// Lecture 27
Event Loop prioritizes
1. Call Stack
2. Callback Queue (Asynchronous functions (like API calls) returned values)

var getUser = (id, callback) => {
	var user = {
		id,
		name: 'Vikram'
	};
	setTimeout(() => {
		callback(user);
	}, 3000);
};

getUser(31, (User) => {
	console.log(User);
});



// Lecture 28 // Lecture 29 // Lecture 30
npm install request
const request = require('request');

request({
	url: 'http://maps.googleapis.com/maps/api/geocode/json?address=986%20Bridgewood%20Way%20sunnyvale',
	json: true
}, (error, response, body) => {
	// console.log(JSON.stringify(body, undefined, 2));
	console.log(`Address: ${body.results[0].formatted_address}`);
	console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
	console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
});


// Lecture 31
npm install yargs@4.8.1 --save
const yargs = require('yargs');

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true //always parse as string, look for string arg
		}
	})
	.help()
	.alias('help', 'h')
	.argv;

console.log(argv);

const address = encodeURIComponent(argv)
decodeURIComponent('Jacky%20Chen')

request({
	url: `http://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
	json: true
}, (error, response, body) => {
	// console.log(JSON.stringify(body, undefined, 2));
	console.log(`Address: ${body.results[0].formatted_address}`);
	console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
	console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
});

// Lecture 32 Handle Callback Errors

request({
	url: `http://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
	json: true
}, (error, response, body) => {
	if (error) {
		console.log('Unable to connect to Google servers.');
	} else if (body.status === 'ZERO_RESULTS'){
		console.log('Unable to find that address.');
	} else if (body.status === 'OK') {
		console.log('Great!');
		// console.log(JSON.stringify(body, undefined, 2));
		console.log(`Address: ${body.results[0].formatted_address}`);
		console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
		console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
	}
});




// Lecture 33 Refactoring Callbacks
const geocode = require('./geocode/geocode');
const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true //always parse as string, look for string arg
		}
	})
	.help()
	.alias('help', 'h')
	.argv;

geocode.geocodeAddress(argv.address);

// next step
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
	if (errorMessage) {
		console.log(errorMessage);
	} else {
		console.log(JSON.stringify(results, undefined, 2));
	}
});


// put this inside dir geocode and geocode.js
var geocodeAddress = (address, callback) => {

	const address = encodeURIComponent(address);
	request({
		url: `http://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
		json: true
	}, (error, response, body) => {
		if (error) {
			callback('Unable to connect to Google servers.');
		} else if (body.status === 'ZERO_RESULTS'){
			callback('Unable to find that address.');
		} else if (body.status === 'OK') {
			callback(undefined, {
				address: body.results[0].formatted_address,
				latitude: body.results[0].geometry.location.lat,
				longitude: body.results[0].geometry.location.lng
			});
		}
	});
}
module.exports.geocodeAddress = geocodeAddress;



// Lecture 34
request({
	url: 'https://api.forcast.io/...lat=...lng=...',
	json: true
}, (err, res, body) => {
	if (err) {
		console.log('Unable to connect Forecast.io servers.');
	} else if (response.statusCode === 400) {
		console.log('Unable to fetch weather.');
	}else if (response.statusCode === 200) {
		console.log(body.currently.temperature);
	}
})



// Lecture 35
weather/weather.js

var getWeather = (location, callback) => {
	request({
		url: `https://api.forcast.io/...lat=${location.lat}lng=${location.lng}`,
		json: true
	}, (err, res, body) => {
		if (err) {
			callback('Unable to connect Forecast.io servers.');
		} else if (response.statusCode === 400) {
			callback('Unable to fetch weather.');
		}else if (response.statusCode === 200) {
			callback(undefined, {
				temperature: body.currently.temperature,
				apparentTemperature: body.currently.apparentTemperature
			});
		}
	})
}

const weather = require('./weather/weather');
weather.getWeather({lat, lng}, (err, info) => {
	if (err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(info, undefined, 2));
	}
});

// Lecture 36 Promises
var somePromise = new Promise((resolve, reject) => {
	setTimeout(() => {
		// will only call the first one of resolve or reject, "settled"
		// resolve('Hey. It worked!');
		reject('Unable to fulfill promise');
	}, 2500);
});

// can only do one or the other
somePromise.then((message)=> {
	console.log('Success!', message);
}, (errorMessage) => {
	console.log('Error: ', errorMessage);
});



// Lecture 37
var asyncAdd = (a, b) => {
	return new Promise((resolve, reject) => {
		setTimeout(()=> {
			if (typeof a === 'number' && typeof b === 'number') {
				resolve(a+b);
			} else {
				reject('Arguments must be numbers');
			}
		}, 1500);
	})
}

asyncAdd(5, 7).then((res) => {
	console.log('Result: ', res);
	return asyncAdd(res, 33);
	return asyncAdd(res, '33');
}, (error) => {
	console.log(error);
}).then((res)=> {
	console.log('Should be 45', res);
}, (error) => {
	console.log(error);
});

// remove multiple error handlers and use .catch()
asyncAdd(5, 7).then((res) => {
	console.log('Result: ', res);
	return asyncAdd(res, 33);
	return asyncAdd(res, '33');
}).then((res)=> {
	console.log('Should be 45', res);
}).catch((errorMessage) => {
	console.log(errorMessage);
});

var geocodeAddress = (address) => {
	return new Promise((res, rej) => {
		const address = encodeURIComponent(address);
		request({
			url: `http://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
			json: true
		}, (error, response, body) => {
			if (error) {
				rej('Unable to connect to Google servers.');
			} else if (body.status === 'ZERO_RESULTS'){
				rej('Unable to find that address.');
			} else if (body.status === 'OK') {
				res(undefined, {
					address: body.results[0].formatted_address,
					latitude: body.results[0].geometry.location.lat,
					longitude: body.results[0].geometry.location.lng
				});
			}
		});
	});
};

geocodeAddress('12345').then( (location) => {
	console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
	console.log(errorMessage);
})




// Lecture 38 Rebuilding Weather App, Using axios
npm instal axios@... --save

const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
	.command('add', 'Add a new note', {
		title: titleOptions,
		body: {
			describe: 'Body of note',
			demand: true,
			alias: 'b'
		}
	})
	.command('list', 'List all notes')
	.command('read', 'Read a note', {
		title: titleOptions
	})
	.command('remove', 'Remove a note', {
		titdle: titleOptions
	})
	.help()
	.argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com....${...}`;

axios.get(geocodeUrl).then((response) => {
	if (response.data.status === 'ZERO_RESULTS') {
		throw new Error('Unable to find that address.');
	}
	var lat = response.data.results[0].geometry.location.lat;
	var lng = response.data.results[0].geometry.location.lng;
	var weatherUrl = `https://qpi.forecast.io/...${lat} ${lng}`;
	console.log(response.data.results[0].formatted_address);
	return axios.get(weatherUrl);
}).then((response) => {
	var temperature = response.data.currently.temperature;
	var apparentTemperature = response.data.currently.apparentTemperature;
	console.log(`It's currently ${temperature}.`);
}).catch((e) => {
	if (e.code === 'ENOTFOUND') {
		console.log('Unable to connect to API servers');
	} else {
		console.log(e.message);
	}
})

node app-promise.js -a '1301 lombard st philidelphia'





// Lecture 39