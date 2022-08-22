import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from './AuthContext';

import * as AuthService from '../../services/auth';

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [initialLoad, setInitialLoad] = useState(false);
    const [userId, setUserId] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState({
        show: false,
        type: '',
        message: ''
    });

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setUserId(userId);
        }

        setInitialLoad(true);
    }, []);

    const login = async (payload) => {
        setLoading(true);

        const response = await AuthService.login(payload);
        if (response && response.status === 200) {
            setAuthError({
                show: false,
                type: '',
                message: ''
            });
            setUserId(response.data.userId);
            localStorage.setItem('userId', response.data.userId);
            setLoading(false);

            navigate('/booking');
        } else {
            setAuthError({
                show: true,
                type: 'error',
                message: 'Incorrect username or password. Please try again.'
            });
            setLoading(false);
        }
    };

    const signUp = async (payload) => {
        setLoading(true);

        const response = await AuthService.signup(payload);
        if (response && response.status === 200) {
            setAuthError({
                show: false,
                type: '',
                message: ''
            });
            setUserId(response.data.userId);
            localStorage.setItem('userId', response.data.userId);
            setLoading(false);

            navigate('/booking');
        } else {
            setAuthError({
                show: true,
                type: 'error',
                message: 'You failed to sign up'
            });
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('userId');
        setUserId(undefined);
        navigate('/');
    };

    // Make the provider update only when it should
    const memoValue = useMemo(
        () => ({
            initialLoad,
            userId,
            loading,
            authError,
            login,
            signUp,
            logout
        }),
        [userId, loading, authError]
    );

    return (
        <AuthContext.Provider value={memoValue}>
            {initialLoad && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
