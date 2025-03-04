import Link from 'next/link';
import styles from '../styles/Login.module.css';

function Login() {
    return (
        <div className={styles.homeContainer}>
            <div className={styles.imageSection}>
                <img src="/images/connection.jpg" alt="Chien et chat" />
            </div>
            <div className={styles.contentSection}>
                <div className={styles.title}>
                    <h1 className={styles.h1}>la bonne</h1>
                    <h1 className={styles.h1complete}>niche</h1>
                </div>
                <Link href="/signin"><button className={styles.button}>CONNECTION</button></Link>
                <Link href="/signup"><button className={styles.button}>INSCRIPTION</button></Link>
            </div>
        </div>
    );
}

export default Login;
