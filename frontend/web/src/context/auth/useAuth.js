import { useContext } from 'react';
import AuthContext from './AuthContext';

const useAuth = () => {
    const user = useContext(AuthContext);

    if (user === undefined) {
        throw new Error('useAuthContext can only be used inside AuthProvider');
    }

    return user;
};

export default useAuth;
