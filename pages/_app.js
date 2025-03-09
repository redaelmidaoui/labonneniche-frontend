import '../styles/globals.css';
import Head from "next/head";

// redux imports
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import favorites from '../reducers/favorites';
import user from '../reducers/user';

const store = configureStore({
    reducer: { favorites, user },
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
