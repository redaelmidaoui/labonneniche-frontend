import Header from '../components/Header';
import SocialLoginButtons from '../components/SocialLoginButtons';

function SignInPage() {
    return (
        <div className="signin-container">
            <Header />
            <h2>PAGE CONNEXION</h2>
            <SocialLoginButtons />
            <form>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Mot de passe" />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}

export default SignInPage;