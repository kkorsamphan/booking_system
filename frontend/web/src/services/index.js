const API_URL = 'http://localhost:8091/api';

const request = (url, method, payload) => {
	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');

	const body = JSON.stringify(payload);

	const requestOptions = {
		method: method,
		headers: myHeaders,
		body: body,
		redirect: 'follow'
	};

	return fetch(API_URL + url, requestOptions)
		.then(async (response) => {
			if (response.status === 200) {
				const data = await response.json();
				return {
					status: 200,
					data
				};
			} else {
				return {
					status: response.status
				};
			}
		})
		.catch((error) => {
			console.log('error: ', error);
		});
};

export { request };
