import './SignUpPage.css';
import Header from '../components/Header';
import SocialLoginButtons from '../components/SocialLoginButtons';

function SignUpPage() {
    return (
        <div className="signup-container">
            <Header />
            <h2>PAGE INSCRIPTION</h2>
            <SocialLoginButtons />
            <form>
                <input type="text" placeholder="Prénom" />
                <input type="text" placeholder="Nom" />
                <input type="text" placeholder="Civilité" />
                <input type="text" placeholder="Adresse" />
                <input type="text" placeholder="Téléphone" />
                <input type="text" placeholder="Mail" />
            </form>
        </div>
    )
}

export default SignUpPage;