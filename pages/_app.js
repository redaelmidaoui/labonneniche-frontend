import '../styles/globals.css'; // Importation des styles globaux pour l'application
import Head from "next/head"; // Gestion des balises <head> (ex: titre de la page, meta tags...)

// Importation des outils de persistance pour Redux
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

// Importation du provider pour l'authentification via Google
import { GoogleOAuthProvider } from '@react-oauth/google';

// Importation des outils Redux
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

// Importation des reducers (états globaux gérés par Redux)
import favorites from '../reducers/favorites';
import user from '../reducers/user';
import adDetails from '../reducers/adDetails';

// Configuration de Redux Persist pour stocker l'état global dans le localStorage
const persistConfig = { key: 'laBonneNiche', storage };

// Combinaison des reducers pour créer un reducer global
const rootReducer = combineReducers({ favorites, user, adDetails });

// Création d'un reducer persistant à partir de la configuration
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Création du store Redux en utilisant le reducer persistant
const store = configureStore({ reducer: persistedReducer });

// Création du persistor pour gérer la persistance des données
const persistor = persistStore(store);

function App({ Component, pageProps }) {
    return (
        // Fournit le contexte d'authentification Google à l'application
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
            {/* Fournit le store Redux à l'application */}
            <Provider store={store}>
                {/* Assure la récupération des données persistées avant d'afficher l'application */}
                <PersistGate persistor={persistor} loading={null}>
                    <Head>
                        <title>la bonne niche</title>
                    </Head>
                    {/* Rendu dynamique des différentes pages de l'application */}
                    <Component {...pageProps} />
                </PersistGate>
            </Provider>
        </GoogleOAuthProvider>
    );
}

export default App;