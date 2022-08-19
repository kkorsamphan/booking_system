import { createContext } from 'react';

const AuthContext = createContext({
	user: {},
	login: () => {},
	signup: () => {},
	logout: () => {}
});

export default AuthContext;
