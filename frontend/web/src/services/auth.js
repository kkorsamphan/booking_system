import { request } from './index';

const signup = (payload) => {
	return request('/signup', 'POST', payload);
};

const login = (payload) => {
	return request('/login', 'POST', payload);
};

export { signup, login };
