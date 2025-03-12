import Image from 'next/image';
import styles from '../styles/Contact.module.css';

function Contact(props) {

    return (
        <div className={`${styles.contact} ${props.isSelected ? styles.selected : ""}`} 
            onClick={props.onClick} 
            style={{ cursor: "pointer", padding: "10px", border: "1px solid black" }} 
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
                <p>{props.contact.firstname}</p>
                <p>{props.contact.mail}</p>
            </div>
        </div>
    );

};

export default Contact;