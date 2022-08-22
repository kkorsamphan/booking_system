import { request } from './index';

const bookRoom = (userId, payload) => {
	return request(`/users/${userId}/bookings`, 'POST', payload);
};

const myBookings = (userId) => {
	return request(`/users/${userId}/bookings`, 'GET');
};

export { bookRoom, myBookings };
