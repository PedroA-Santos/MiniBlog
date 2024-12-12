import { db } from '../firebase/conifg';


import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'


export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // cleanup
    //deal with memory leak

    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()


    function checkiIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }



    const createUser = async (data) => {
        checkiIfIsCancelled()

        setLoading(true)
        setError(null)

        try {

            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            setLoading(false)
            return user

        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);


            let systemErrorMessage

            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres"
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado"
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente novamente mais tarde"
            }

            setLoading(false)
            setError(systemErrorMessage)


        }


    };

    //logout

    const logout = () => {
        checkiIfIsCancelled();
        signOut(auth)
    }


    //login  

    const login = async (data) => {
        checkiIfIsCancelled();

        setLoading(true);
        setError(false);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);
            console.log(error.message.includes("user-not"));

            let systemErrorMessage;

            if (error.message.includes("user-not-found")) {
                systemErrorMessage = "Usuário não encontrado.";
            } else if (error.message.includes("wrong-password")) {
                systemErrorMessage = "Senha incorreta.";
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
            }

            console.log(systemErrorMessage);

            setError(systemErrorMessage);
        }

        console.log(error);

        setLoading(false);
    };

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    };

};