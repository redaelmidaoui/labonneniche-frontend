import '../styles/globals.css';
import Head from "next/head";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';

// redux imports
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import favorites from '../reducers/favorites';
import user from '../reducers/user';
import adDetails from '../reducers/adDetails';

const store = configureStore({
    reducer: {
        favorites,
        user,
        adDetails,
     },
  });

  // Pour gérer l'initialisation du store de Redux (et donc sa persistance), il faut obligatoirement
  // faire une fonction à part car l'application doit être enveloppée quant à elle dans le provider.

//   function ReduxInitializer(){
//     const dispatch = useDispatch();

//         useEffect(() => {
//             const token = localStorage.getItem('token');

//             if (token) {
//                 fetch(`http://localhost:3000/users/${token}`)
//                 .then(res => res.json())
//                 .then(data => {
//                     if (data.result) {
//                         dispatch(login({ token, user: data.user }));
//                     } else {
//                         console.log("Token invalide");
//                     }
//                 })
//                 .catch(() => console.log("Erreur de récupération user"));
//             }
//         }, []);

//         return null;
// }

function App({ Component, pageProps }) {
    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
            <Provider store={store}>
                <Head>
                    <title>la bonne niche</title>
                </Head>
                <Component {...pageProps} />
            </Provider>
        </GoogleOAuthProvider>
  );
}

export default App;
