import styles from '../styles/LoginReminderPopup.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToArc } from '@fortawesome/free-solid-svg-icons';
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
            {/* <FontAwesomeIcon
                icon={faArrowRightToArc}
                className={styles.loginIcon}
                onClick={goToLogin}
            />     */}
        </div>
    );
};

export default LoginReminderPopup;