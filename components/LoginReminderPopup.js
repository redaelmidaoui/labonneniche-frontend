import styles from '../styles/LoginReminderPopup.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

function LoginReminderPopup({ isLoggedIn }) {
    const router = useRouter();


    const goToLogin = () => {
        router.push('/login');
    }

    return (
        <div className={styles.popupContainer}>
            <p>Pour accéder à toutes les fonctionnalités, connectez-vous !</p>
            <button className={styles.loginButton} onClick={goToLogin}>
                SE CONNECTER
            </button>  
        </div>
    );
};

export default LoginReminderPopup;