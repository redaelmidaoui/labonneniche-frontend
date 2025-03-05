import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import styles from '../styles/SocialLoginButtons.module.css';
import { useEffect } from 'react';

function SocialLoginButtons() {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.onload = initializeGoogle;
        document.body.appendChild(script);

        window.fbAsyncInit = function() {
            window.FB.init({
                appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
                cookie: true,
                xfbml: true,
                version: 'v18.0',
            });
        };

        (function(d, s, id) {
            let js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }, []);

    const initializeGoogle = () => {
        window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            callback: handleGoogleCallback,
        });

        window.google.accounts.id.renderButton(
            document.getElementById("googleLoginButton"),
            { theme: "outline", size: "large" }
        );
    };

    const handleGoogleCallback = (response) => {
        console.log('Google callback reçu !', response);
    };

    const handleGoogleLogin = () => {
        window.google.accounts.id.prompt();
    };

    const handleFacebookLogin = () => {
        window.FB.login(response => {
            console.log('Réponse Facebook :', response);
        }, { scope: 'email' });
    };

    return (
        <div className={styles.container}>
            <button onClick={handleGoogleLogin} className={`${styles.socialButton} ${styles.google}`}>
                <FontAwesomeIcon icon={faGoogle} className={styles.icon} />
                Connexion avec Google
            </button>
            <button onClick={handleFacebookLogin} className={`${styles.socialButton} ${styles.facebook}`}>
                <FontAwesomeIcon icon={faFacebook} className={styles.icon} />
                Connexion avec Facebook
            </button>
        </div>
    );
}

export default SocialLoginButtons;
