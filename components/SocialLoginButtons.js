import styles from '../styles/SocialLoginButtons.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

function SocialLoginButtons() {
    const router = useRouter();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = () => initializeGoogle();
        document.body.appendChild(script);
    }, []);

    const initializeGoogle = () => {
        if (!window.google) {
            console.error("Google SDK non chargé");
            return;
        }

        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        if (!clientId) {
            console.error("NEXT_PUBLIC_GOOGLE_CLIENT_ID manquant");
            return;
        }

        window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleGoogleCallback,
            ux_mode: 'popup',
        });
    };

    const handleGoogleLogin = () => {
        window.google.accounts.id.prompt();
    };

    const handleGoogleCallback = (response) => {
        if (!response.credential) {
            console.error("Aucun credential reçu");
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
                router.push(`/next?token=${data.token}&firstname=${encodeURIComponent(data.firstname)}`);
            } else {
                console.error("Erreur serveur :", data.error);
            }
        })
        .catch(err => console.error("Erreur réseau :", err));
    };

    return (
        <div className={styles.container}>
            <button className={`${styles.socialButton} ${styles.google}`}>
                <FontAwesomeIcon icon={faGoogle} className={styles.icon} />
                Connexion avec Google
            </button>
        </div>
    );
}

export default SocialLoginButtons;
