import Image from 'next/image';
import styles from '../styles/Contact.module.css';

function Contact(props) {
    return (
        <div className={styles.contact}>
            <Image 
                className={styles.imageProfile}
                src="/images/wannes-de-mol-Cduc0oslTxQ-unsplash.jpg"
                width={100}
                height={100}
            />
            <div>
                <p>{props.id_contact}</p>
                <p>{props.date_last_message}</p>
            </div>
        </div>
    )
};

export default Contact;