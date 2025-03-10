import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/users';
import { useRouter } from 'next/router';

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;


function SocialLoginButtons() {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogin = (credentialResponse) => {
        const userData = jwtDecode(credentialResponse.credential);
    
        fetch('http://localhost:3000/users/google-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: userData.email, name: userData.name })
        })
        .then(res => res.json())
        .then(data => {
            if (data.result) {
                dispatch(login({ token: data.token, user: data.user }));
                localStorage.setItem('token', data.token);
                alert("Connexion réussie !");
                router.push('/');  // 🚀 Redirige vers l'accueil
            } else {
                alert("Erreur de connexion avec Google.");
            }
        })
        .catch(err => console.error("Erreur lors de la connexion Google", err));
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                onSuccess={(credentialResponse) => handleLogin(credentialResponse)}
                on Error={() => console.error("Erreur lors de la connexion avec Google")}
            />
        </GoogleOAuthProvider>
    );
}

export default SocialLoginButtons;