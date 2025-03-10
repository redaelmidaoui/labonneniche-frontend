import styles from "../styles/Card.module.css";
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function Card(props) {

    return (
        <div className={styles.divCard}>
            <div className={styles.card}>
                <div className={styles.image}>
                    <Image src={props.picture} alt={props.title} width={300} height={260} style={{
                        borderRadius: '30px', // Applique un border-radius directement à l'image
                    }}></Image>
                </div>
                <div className={styles.heart}>
                    <FontAwesomeIcon icon={faHeart} />
                </div>
                <div className={styles.infosCard}>
                    <p className={styles.type}>Type: {props.type}</p>
                    <p className={styles.type}>Âge: {props.age}</p>
                    <p className={styles.type}>Genre: {props.genre}</p>
                    <p>Description: {props.description}</p>
                    <div className={styles.adresse}>{props.ville} {props.codePostale}</div>
                </div>
            </div>
        </div>
    )}


    export default Card;