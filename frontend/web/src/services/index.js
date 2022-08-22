const API_URL = 'http://localhost:8091/api';

const request = (url, method, payload) => {
	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');

	const requestOptions = {
		method: method,
		headers: myHeaders,
		redirect: 'follow'
	};

	if (payload) {
		const body = JSON.stringify(payload);
		requestOptions.body = body;
	}

	return fetch(API_URL + url, requestOptions)
		.then(async (response) => {
			const data = await response.json();
			if (response.status === 200) {
				return {
					status: 200,
					data
				};
			} else {
				return {
					status: response.status,
					error: data.message
				};
			}
		})
		.catch((error) => {
			console.log('error: ', error);
		});
};

export { request };
