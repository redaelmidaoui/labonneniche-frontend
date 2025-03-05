import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import styles from '../styles/SocialLoginButtons.module.css';
import { useEffect } from 'react';

function SocialLoginButtons() {

    useEffect(() => {

        // On charge les scripts de Google et Facebook grâce au useEffect 
        // pour pouvoir récupérer leur SDK (Software Development Kit: 
        // un ensemble d'outils propres à Google et Facebook dans ce cas de figure)

        const script = document.createElement('script');
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.onload = initializeGoogle;
        document.body.appendChild(script);

        // L'appId de Facebook doit être configurée (elle doit 
        // également figurer dans les variables d'environnement)

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

    // Pour la connection Google, il faut ensuite configurer l' Id du client ainsi que la fonction 
    // qui sera appelée lors du retour d'authentification (authentification 
    // reléguée à Google par conséquent)

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

    // A l'appui sur le bouton "connection avec Google", 
    // un pop-up propre au navigateur s'affiche pour 
    // authentifier le client

    const handleGoogleLogin = () => {
        window.google.accounts.id.prompt();
    };

    // Même chose normalement du côté de Facebook,
    // un pop-up d'authentification apparaît

    const handleFacebookLogin = () => {
        window.FB.login(response => {
            console.log('Réponse Facebook :', response);
        }, { scope: 'email' });
    };

    // Suite à l'affichage du pop-up Google envoie au backend un "credential",
    // quant à Facebook, il envoie un "accessToken", ce sont deux façon différentes 
    // d'authentifier le client, cette authentification n'est par conséquent pas 
    // exécutée par le backend lui-même (contrairement aux inscriptions standards)

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
