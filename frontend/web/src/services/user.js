const API_URL = 'localhost:8091/api';

const register = (payload) => {
	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');

	const body = JSON.stringify(payload);

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: body,
		redirect: 'follow'
	};

	return fetch(API_URL + '/register', requestOptions)
		.then((response) => response.json())
		.then((result) => console.log(result))
		.catch((error) => console.log('error', error));
};

export { register };
