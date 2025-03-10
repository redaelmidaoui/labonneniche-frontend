import { useState } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/Publication.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";

export default function PostAd() {
    const [images, setImages] = useState([null, null, null]);
    const [animalType, setAnimalType] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [character, setCharacter] = useState("");

    const handleDrop = (event, index) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const newImages = [...images];
            newImages[index] = reader.result;
            setImages(newImages);
        };
        reader.readAsDataURL(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div className={styles.container}>

            <Header />

            <div className={styles.leftSection}>
                <div className={styles.gallery}>
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`${styles.imageUpload} ${image ? styles.noBorder : ""}`}
                            onDrop={(event) => handleDrop(event, index)}
                            onDragOver={handleDragOver}
                        >
                            {image ? (
                                <img src={image} alt={`Animal ${index + 1}`} className={styles.uploadedImage} />
                            ) : (
                                <>
                                <p className={styles.mention}>Importez<br></br>une photo</p>
                                <FontAwesomeIcon className={styles.photoIcon} icon={faCircleDown} />
                                </>
                            )}
                        </div>
                    ))}
                </div>

                <div className={styles.radioGroup}>
                    <label>Type :</label>
                    <label><input type="radio" name="type" value="chat" onChange={() => setAnimalType("chat")} />Chat</label>
                    <label><input type="radio" name="type" value="chien" onChange={() => setAnimalType("chien")} />Chien</label>
                </div>

                <div className={styles.radioGroup}>
                    <label>Âge :</label>
                    <label><input type="radio" name="age" value="junior" onChange={() => setAge("junior")} />Junior</label>
                    <label><input type="radio" name="age" value="senior" onChange={() => setAge("senior")} />Senior</label>
                </div>

                <div className={styles.radioGroup}>
                    <label>Genre :</label>
                    <label><input type="radio" name="gender" value="male" onChange={() => setGender("junior")} />Mâle</label>
                    <label><input type="radio" name="gender" value="female" onChange={() => setGender("senior")} />Femelle</label>
                </div>

                <textarea
                    className={styles.textarea}
                    placeholder="Décrivez le caractère de l'animal"
                    value={character}
                    onChange={(e) => setCharacter(e.target.value)}
                />
            </div>

            <div className={styles.rightSection}>
                <div className={styles.userCard}>
                    <h3>Informations du propriétaire</h3>
                    <p><strong>Nom :</strong></p>
                    <p><strong>Prénom :</strong></p>
                    <p><strong>Email :</strong></p>
                    <p><strong>Région :</strong></p>
                    <p><strong>Département :</strong></p>
                    <p className={styles.dataInfo}><strong>Posté le :</strong></p>
                </div>
            </div>
        </div>
    );
}