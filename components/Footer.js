import styles from '../styles/Footer.module.css'

function Footer() {
    return (
        <div className={styles.footerBar}>
            <p className={styles.mentionLeft}>©labonneniche.com</p>
            <div className={styles.mentionRight}>
                <p className={styles.mentionAtLast}>Information</p>
                <p className={styles.mentionAtLast}>Contact</p>
                <p className={styles.mentionAtLast}>Conditions</p>
            </div>
        </div>
    )
}

export default Footer;