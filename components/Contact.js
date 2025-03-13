import Image from 'next/image';
import styles from '../styles/Contact.module.css';

function Contact(props) {

    return (
        <div className={`${styles.contact} ${props.isSelected ? styles.selected : ""}`} 
            onClick={props.onClick} 
            tabIndex={0} 
            role="button"
        >
            <Image 
                className={styles.imageProfile}
                src="/images/wannes-de-mol-Cduc0oslTxQ-unsplash.jpg"
                width={100}
                height={100}
            />
            <div>
                <p className={styles.userInfoName}>{props.contact.firstname}</p>
                <p className={styles.userInfo}>{props.contact.mail}</p>
            </div>
        </div>
    );

};

export default Contact;