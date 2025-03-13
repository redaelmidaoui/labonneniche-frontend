import styles from '../styles/Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHouse, faMessage, faCircleArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import LoginReminderPopup from './LoginReminderPopup';
import Link from 'next/link';

function Header() {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const goToAccount = () => {
        router.push('/account');
    };

    const goToHome = () => {
        router.push('/');
    };

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        router.push('/');
    };

    const handleAddAd = () => {
        if (!user.token) {
            router.push('/login'); // Redirige vers la page de connexion si non connecté
        } else {
            router.push('/publication'); // Redirige vers la page de publication si connecté
        }
    };

    return (
        <div className={styles.content}>
            <Link href="/"><h1 className={styles.logo}>la bonne niche</h1></Link>
            <div className={styles.addAdContainer}>
                    <button className={styles.addAdButton} onClick={handleAddAd}>
                        <span className={styles.plus}>+</span> Ajouter une annonce
                    </button>
                </div>
            <div className={styles.icon}>
                <FontAwesomeIcon 
                    alt="Accueil" 
                    className={styles.singleIcon} 
                    icon={faHouse}
                    onClick={goToHome} 
                    style={{ cursor: 'pointer' }}
                />
                <Link href="/messaging"><FontAwesomeIcon alt="Messagerie" className={styles.singleIcon} icon={faMessage} /></Link>
                <FontAwesomeIcon 
                    alt="Mon compte"
                    className={styles.singleIcon} 
                    icon={faUser}
                    onClick={goToAccount}
                    style={{ cursor: 'pointer' }} 
                />
                {/* Bouton pour ajouter une annonce */}
                {user.token && (
                    <FontAwesomeIcon 
                        alt="Se déconnecter" 
                        className={styles.singleIcon} 
                        icon={faCircleArrowRight} 
                        onClick={handleLogout}
                        style={{ cursor: 'pointer' }} 
                    />
                )}
            </div>
            {!user.token && <LoginReminderPopup />}
        </div>
    );
}

export default Header;