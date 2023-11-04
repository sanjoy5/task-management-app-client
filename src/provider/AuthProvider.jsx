import React, { createContext, useContext, useEffect, useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import axios from 'axios'
import app from '../firebase/firebase.config';


export const AuthContext = createContext(null)
const auth = getAuth(app)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const googleProvider = new GoogleAuthProvider()

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (currenUser, name) => {
        return updateProfile(currenUser, {
            displayName: name
        })
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }


    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const resetPassword = (email) => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('OnAuthState Current User : ', currentUser);
            setUser(currentUser)

            // 1st Task 
            // get and set Token 
            if (currentUser) {
                axios.post('http://127.0.0.1:5000/jwt', { email: currentUser.email })
                    .then(data => {
                        // console.log('Data::: ', data.data);
                        localStorage.setItem('access-token', data.data.token)
                        setLoading(false)
                    })
            } else {
                localStorage.removeItem('access-token')
            }
        })
        return () => {
            return unsubscribe()
        }
    }, [])


    const authInfo = {
        user,
        createUser,
        signIn,
        updateUserProfile,
        googleSignIn,
        logOut,
        resetPassword,
        loading,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export default AuthProvider;