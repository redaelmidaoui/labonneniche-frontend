import styles from '../styles/SocialLoginButtons.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';


    useEffect (() => {
        const script = document.createElement('script');
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = initializeGoogle;
        document.body.appendChild(script);
    }, []);

    const initializeGoogle = () => {
        if (!window.google) {
            console.error("Google SDK non chargé");
            return;
        }

        const  clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        if (!clientId) {
            console.error("NEXT_PUBLIC_GOOGLE_CLIENT_ID manquant");
            return;
        }

        window
    }

        

export default SocialLoginButtons;
