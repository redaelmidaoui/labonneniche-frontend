import '../styles/globals.css';
import Head from "next/head";

// redux imports
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import favorites from '../reducers/favorites';
import users from '../reducers/users';

const store = configureStore({
    reducer: {
        favorites,
        users,
     },
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
