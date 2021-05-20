const { IncomingMessage } = require('http');
const formData = require('form-data');
const axios = require('axios').default;

const defaultAxios = axios.create({
	baseURL:  "https://db--storage.herokuapp.com/"
});

/** @typedef {(res: [import('axios').AxiosResponse]) => void} request_callback */

/**
 * 
 * @param {string} url 
 * @param {string} method 
 * @param {object} data 
 * @param {request_callback} callback 
 */
function _request(url, method, data, callback) {
	const form = new formData();
	for(const dataName in data) {
		form.append(dataName, data[dataName]);
	};

	const options = {
		url: url,
		method: method,
		data: form,
		headers: form.getHeaders()
	};
	
	defaultAxios(options)
		.then((res) => {
			callback(res);
		})
		.catch((res) => {
			callback(res);
		})
} 

/**
 * 
 * @param {string} url target
 * @param {string} method 
 * @param {object} data 
 * @param {request_callback} [callback] 
 * @returns {Promise<[import('axios').AxiosResponse]>}
 */
function request(url, method, data, callback) {
	if(callback) {
		_request(url, method, data, callback);
	} else {
		return new Promise((res, rej) => {
			_request(url, method, data, (_res) => {
				res([_res]);
			})
		})
	}
}

module.exports = { request };