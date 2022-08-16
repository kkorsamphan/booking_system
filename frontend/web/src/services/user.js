import { request } from './index';

const register = (payload) => {
	return request('/register', 'POST', payload);
};

const login = (payload) => {
	return request('/login', 'POST', payload);
};

export { register, login };
