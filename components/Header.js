import styles from '../styles/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLocationDot, faMessage } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

function Header() {
    const router = useRouter();

    const goToAccount = () => {
        router.push('/account');
    };

    return (
        <div className={styles.content}>
            <h1 className={styles.logo}>la bonne niche</h1>
            <div className={styles.icon}>
               <FontAwesomeIcon className={styles.singleIcon} icon={faLocationDot} />
                <FontAwesomeIcon className={styles.singleIcon} icon={faMessage} />
                <FontAwesomeIcon 
                    className={styles.singleIcon} 
                    icon={faUser}
                    onClick={goToAccount}
                    style={{ cursor: 'pointer' }} />
            </div>
        </div>
    );
}

export default Header;