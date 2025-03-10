import '../styles/globals.css';
import Head from "next/head";

// redux imports
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import favorites from '../reducers/favorites';
<<<<<<< HEAD
import users from '../reducers/users';

const store = configureStore({
    reducer: {
        favorites,
        users,
     },
=======
import user from '../reducers/user';

const store = configureStore({
    reducer: { favorites, user },
>>>>>>> 78ae45c9545445f3f21a899f6572b68c24bd2234
  });

function App({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Head>
                <title>la bonne niche</title>
            </Head>

            <Component {...pageProps} />
        </Provider>
  );
}

export default App;
