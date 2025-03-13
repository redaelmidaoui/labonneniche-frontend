import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/Publication.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown, faPenToSquare, faSave, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function PostAd() {
    // Récupération des informations de l'utilisateur depuis Redux
    const user = useSelector((state) => state.user);

    // États pour la gestion des informations de l'annonce
    const [ad, setAd] = useState(null);
    const [images, setImages] = useState([null, null, null]);
    const [animalType, setAnimalType] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [character, setCharacter] = useState("");
    const [number, setNumber] = useState(1);
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [popup, setPopup] = useState({ show: false, message: "", success: false });
    const router = useRouter();
    
    // Gestion de la date actuelle
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois débutent à 0
    const year = date.getFullYear();

    function capitalize(str) {
        return str ? str.trim().charAt(0).toUpperCase() + str.trim().slice(1).toLowerCase() : "";
    }

    // Gestion de l'édition des informations utilisateur
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(() => ({
        lastname: capitalize(user?.lastname || ""),
        firstname: capitalize(user?.firstname || ""),
        mail: user?.mail || "",
        city: "",
        department: "",
    }));

    // Fonction d'affichage de la popup de confirmation ou d'erreur
    const showPopup = (message, success) => {
        setPopup({ show: true, message, success });
        setTimeout(() => {
            setPopup({ show: false, message: "", success: false });
            if (success) {
                router.push("/account");
            }
        }, 3000);
    };

   // Mise à jour des champs utilisateur en mode édition 
    const handleChange = (e) => {
        setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    };

    // Activation du mode édition
    const handleEditClick = () => {
        setIsEditing(true);
    };

    // Sauvegarde des informations utilisateur après modification
    const handleSaveClick = () => {
        console.log("Données sauvegardées :", editedUser);
        setIsEditing(false);
    };

    // Soumission de l'annonce
    const handleSubmit = () => {
        if (!user || !user._id) {
            console.error("Utilisateur non connecté !");
            return;
        }

        // Construction de l'objet de l'annonce
        const adData = {
            token : user.token,
            publicationDate: new Date(),
            pictures: images.filter(img => img !== null),
            number,
            age,
            sort: animalType,
            gender,
            description: character,
            city,
            postalCode,
            author: user._id,
        };

        console.log("Utilisateur :", user);
        console.log("Données envoyées :", adData);

        fetch("https://labonneniche-backend.vercel.app/ads", {
            method: 'POST',
            headers: { "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify(adData),
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.data) {
                showPopup("Annonce publiée avec succès !", true);
            } else {
                showPopup("Erreur lors de la publication", false);
            }
        })
        .catch(error => console.error("Erreur du serveur :", error));
    };

    // Gestion du glisser-déposer des images
    const handleDrop = (event, index) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const newImages = [...images];
            newImages[index] = reader.result;
            setImages(newImages);
            console.log(newImages);
        };
        reader.readAsDataURL(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <>
        <Header />
        <hr className={styles.line}/>
            <div className={styles.container}>

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
                                    <div>
                                    <img src={image} alt={`Animal ${index + 1}`} className={styles.uploadedImage} />
                                    </div>
                                ) : (
                                    <>
                                    <div className={styles.instruction}>
                                        <p className={styles.mention}>Importez<br></br>une photo</p>
                                        <FontAwesomeIcon className={styles.photoIcon} icon={faCircleDown} />
                                    </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className={styles.radioContainer}>
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
                            <label><input type="radio" name="gender" value="mâle" onChange={() => setGender("mâle")} />Mâle</label>
                            <label><input type="radio" name="gender" value="femelle" onChange={() => setGender("femelle")} />Femelle</label>
                            <label><input type="radio" name="gender" value="les deux" onChange={() => setGender("les deux")} />Les deux (en cas de portée)</label>
                        </div>
                    </div>

                    <div>
                        <label>Description :</label>
                        <div>
                            <textarea
                                className={styles.textarea}
                                placeholder="Décrivez le caractère de l'animal"
                                value={character}
                                onChange={(e) => setCharacter(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.rightSection}>
                    <div className={styles.userCard}>
                        <h3 className={styles.title}>Informations du propriétaire</h3>
                        <p><strong className={styles.field}>Nom :</strong> 
                            {isEditing ? <input 
                            type="text" 
                            name="lastname" 
                            value={editedUser.lastname} 
                            onChange={handleChange} /> : editedUser.lastname || "Non renseigné"}</p>
                        <p><strong className={styles.field}>Prénom :</strong>
                            {isEditing ? <input 
                            type="text" 
                            name="firstname" 
                            value={editedUser.firstname} 
                            onChange={handleChange} /> : editedUser.firstname || "Non renseigné"}</p>
                        <p><strong className={styles.field}>Email :</strong>
                            {isEditing ? <input 
                            type="email" 
                            name="mail" 
                            value={editedUser.mail} 
                            onChange={handleChange} /> : editedUser.mail || "Non renseigné"}</p>
                        <p><strong className={styles.field}>Ville :</strong>
                            {isEditing ? <input 
                            type="text" 
                            name="city" 
                            value={editedUser.city} 
                            onChange={handleChange} /> : editedUser.city || "À compléter"}</p>
                        <p><strong className={styles.field}>Département :</strong>
                        {isEditing ? <input 
                        type="text" 
                        name="department" 
                        value={editedUser.department} 
                        onChange={handleChange} /> : editedUser.department || "À compléter"}</p>
                        <p className={styles.dataInfo}><strong>Posté le :</strong><span className={styles.date}>{day}/{month}/{year}</span></p>
                        <div className={styles.finalApprouvment}>
                        {isEditing ? (
                            <FontAwesomeIcon icon={faSave} onClick={handleSaveClick} />
                        ) : (
                            <FontAwesomeIcon icon={faPenToSquare} onClick={handleEditClick} />
                        )}

                        {editedUser.lastname && editedUser.firstname && editedUser.mail && editedUser.city && editedUser.department ? (
                            <FontAwesomeIcon
                            className={styles.infoIconSend} 
                            icon={faPaperPlane} 
                            onClick={handleSubmit} 
                        />
                        ) : null}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            {popup.show && (
                <div className={styles.popupBackground}>
                    <div className={styles.popup}>
                        <p>{popup.message}</p>
                        <button onClick={() => setPopup({ show: false, message: "", success: false })}>
                            OK
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}