import styles from '../styles/SocialLoginButtons.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';

function SocialLoginButtons() {
    const router = useRouter();

    useEffect(() => {

        // On charge les scripts de Google et Facebook grâce au useEffect 
        // pour pouvoir récupérer leur SDK (Software Development Kit: 
        // un ensemble d'outils propres à Google et Facebook dans ce cas de figure)

        const script = document.createElement('script');
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.onload = () => {
            console.log("✅ SDK Google chargé !");
            initializeGoogle();
        };
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
            ux_mode: 'popup',   // 💣 BAM ! Adieu FedCM
            itp_support: true,  // Optionnel, mais aide avec les cookies cross-site
        });
    };

    // A l'appui sur le bouton "connection avec Google", 
    // un pop-up propre au navigateur s'affiche pour 
    // authentifier le client
    
    const handleGoogleLogin = () => {
        console.log("🔍 SDK Google :", window.google?.accounts?.id);
        console.log("🔍 GOOGLE CLIENT_ID :", process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
        console.log('→ handleGoogleLogin');
        
        window.google.accounts.id.prompt();

    };
    
    const handleGoogleCallback = (response) => {
        console.log('✅ Google nous a donné ça (callback reçu)', response);
        if (!response.credential) {
            console.error("❌ Pas de credential reçu, FedCM a encore frappé...");
            return;
        }

        fetch('/users/google-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ credential: response.credential })
        })
        .then(res => res.json())
        .then(data => {
            if (data.result) {
                console.log("→ Connexion Google réussie !", data);
                router.push(`/next?token=${data.token}&firstname=${encodeURIComponent(data.firstname)}`);
            } else {
                console.error("→ Echec connexion Google", data.error);
            }
        })
        .catch(err => {
            console.error("→ Erreur réseau :", err);
        });
    };

    // Même chose normalement du côté de Facebook,
    // un pop-up d'authentification apparaît

    const handleFacebookLogin = () => {
        window.FB.login(response => {
            if (response.authResponse) {
                fetch('/users/facebook-login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ accessToken: response.authResponse.accessToken }),
                })
                .then(res => res.json())
                .then(data => {
                    if (data.result) {
                        console.log("Connexion Facebook réussie !", data);
                        router.push(`/next?token=${data.token}&firstname=${encodeURIComponent(data.firstname)}`);
                    } else {
                        console.error("Echec connexion Facebook", data.error);
                    }
                })
                .catch(err => {
                    console.log('Utilisateur a annulé la connexion Facebook');
                });
            } else {
                console.log('Utilisateur a annulé');
            }
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
