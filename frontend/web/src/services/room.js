import { request } from './index';

const findRooms = (roomSize, startTime, endTime) => {
	return request(
		`/rooms?roomSize=${roomSize}&startTime=${startTime}&endTime=${endTime}`,
		'get'
	);
};

export { findRooms };
