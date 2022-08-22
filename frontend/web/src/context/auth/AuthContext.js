import { createContext } from 'react';

const AuthContext = createContext({
	userId: undefined,
	loading: false,
	authError: {},
	login: () => {},
	signup: () => {},
	logout: () => {}
});

export default AuthContext;
