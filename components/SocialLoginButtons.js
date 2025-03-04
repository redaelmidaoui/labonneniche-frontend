import { useEffect } from 'react';

function SocialLoginButtons() {

    // Chargement du SDK Google au montage du composant
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.onload = initializeGoogle;
        document.body.appendChild(script);

        // Chargement du SDK Facebook
        window.fbAsyncInit = function() {
            window.FB.init({
                appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
                cookie: true,
                xfbml: true,
                version:'v18.0',
            });
        };


        (function(d ,s , id){
            let js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }, []);

    // Initialisation du bouton Google
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

    // Callback Google
    const handleGoogleCallback = (response) => {
        fetch('https://1fd0-2001-861-e3c3-93b0-c8e7-7ea2-2627-8532.ngrok-free.app/users/google-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ credential: response.credential }),
        })
        .then(res => res.json())
        .then(data => {
            console.log('Google Login Success: ', data);
            // Le token est sauvegardé ou redirigé
        })
        .catch(err => console.error('Google Login Error:', err));
    };

    // Login Facebook
    const handleFacebookLogin = () => {
        window.FB.login(response => {
            if (response.authResponse) {
                fetch('https://1fd0-2001-861-e3c3-93b0-c8e7-7ea2-2627-8532.ngrok-free.app/users/facebook-login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body:JSON.stringify({ accessToken: response.authResponse.accessToken }),
                })
                .then(res => res.json())
                .then(data => {
                    console.log('Facebook Login Success: ', data);
                    // Le token est sauvegardé ou redirigé
                })
                .catch(err => console.error('Facebook Login Error: ', err));
            }
        }, { scope: 'email' });
    };


    return (
        <div className="social-buttons">
            <div id="googleLoginButton"></div>
            <button onClick={handleFacebookLogin} className="facebook-btn">Connexion avec Facebook</button>
        </div>
    );
}

export default SocialLoginButtons;