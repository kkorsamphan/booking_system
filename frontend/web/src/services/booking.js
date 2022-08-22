import { request } from './index';

const cancelBooking = (bookingId, payload) => {
	return request(`/bookings/${bookingId}`, 'PUT', payload);
};

export { cancelBooking };
