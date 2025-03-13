// JWT = un jeton sécurisé qui permet d’authentifier un utilisateur sans qu’il ait besoin de se reconnecter à chaque requête.
// Google OAuth = un système d’authentification qui permet aux utilisateurs de se connecter via leur compte Google, sans créer de mot de passe spécifique à ton site.

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; // Importation des composants nécessaires pour l'authentification Google.
import { jwtDecode } from 'jwt-decode'; // Permet de décoder le token JWT envoyé par Google.
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { useRouter } from 'next/router';

// Récupération de l'ID client de Google depuis les variables d'environnement.
const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;


function SocialLoginButtons() {
    const dispatch = useDispatch();
    const router = useRouter();

    // Fonction exécutée après une connexion réussie avec Google.
    const handleLogin = (credentialResponse) => {
        const userData = jwtDecode(credentialResponse.credential); // Décodage du token JWT pour récupérer les infos de l'utilisateur.
    
        fetch('https://labonneniche-backend.vercel.app/users/google-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: userData.email, name: userData.name })
        })
        .then(res => res.json())
        .then(data => {
            if (data.result) {
                dispatch(login( data.user )); // Mise à jour du state Redux avec les infos utilisateur.
                localStorage.setItem('token', data.user.token); // Stockage du token JWT pour maintenir la session.
                alert("Connexion réussie !");
                router.push('/'); 
            } else {
                alert("Erreur de connexion avec Google.");
            }
        })
        .catch(err => console.error("Erreur lors de la connexion Google", err));
    };

    return (
        // Fournisseur OAuth de Google, qui englobe le composant de connexion.
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                onSuccess={(credentialResponse) => handleLogin(credentialResponse)}
                on Error={() => console.error("Erreur lors de la connexion avec Google")}
            />
        </GoogleOAuthProvider>
    );
}

export default SocialLoginButtons;