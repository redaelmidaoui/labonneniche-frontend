import styles from '../styles/Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHouse, faMessage, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import LoginReminderPopup from './LoginReminderPopup';
import Link from 'next/link';

function Header() {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    console.log(user);

    const goToAccount = () => {
        router.push('/account');
    };

    const goToHome = () => {
        router.push('/');
    };

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        router.push('/')
    }

    return (
        <div className={styles.content}>
            <Link href="/"><h1 className={styles.logo}>la bonne niche</h1></Link>
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