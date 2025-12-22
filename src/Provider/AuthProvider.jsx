import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState('');
    const [dbUser, setDbUser] = useState(null);

    // Prefer env base URL but fall back to local dev
    const apiBase = useMemo(() => import.meta.env.VITE_API_URL || 'http://localhost:3000', []);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        if (auth.currentUser) {
            await signOut(auth);
        }
        return signInWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false));
    };

    const updateUserProfile = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth)
            .finally(() => setLoading(false));
    };

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
            .finally(() => setLoading(false));
    };

    const fetchDbUser = useCallback(async () => {
        if (!user?.email) {
            setDbUser(null);
            setRole('');
            return null;
        }

        try {
            const token = await user.getIdToken();
            const response = await axios.get(`${apiBase}/users/${user.email}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setDbUser(response.data || null);
            setRole(response.data?.role || '');
            return response.data;
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setDbUser(null);
            setRole('');
            return null;
        }
    }, [apiBase, user?.email, user]);

    // Keep DB user/role in sync with auth state
    useEffect(() => {
        let active = true;
        const hydrate = async () => {
            setLoading(true);
            const data = await fetchDbUser();
            if (!active) return;
            // Loading state cleared after fetch completes
            setLoading(false);
            return data;
        };
        hydrate();
        return () => { active = false; };
    }, [fetchDbUser]);

    const authData = {
        user,
        loading,
        setUser,
        createUser,
        login,
        logOut,
        signInWithGoogle,
        updateUserProfile,
        auth,
        role,
        dbUser,
        refreshDbUser: fetchDbUser

    };

    return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
