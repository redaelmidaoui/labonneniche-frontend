import { useState } from "react";
import { useSelector } from "react-redux";
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/Publication.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown, faPenToSquare, faSave, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function PostAd() {
    const user = useSelector((state) => state.users.user);
    const token = useSelector((state) => state.users.token);
    const [ad, setAd] = useState(null);
    const [images, setImages] = useState([null, null, null]);
    const [animalType, setAnimalType] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [character, setCharacter] = useState("");
    const [number, setNumber] = useState(1);
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");

    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(() => ({
        lastname: user?.lastname || "",
        firstname: user?.firstname || "",
        mail: user?.mail || "",
        city: "",
        department: "",
    }));
    

    const handleChange = (e) => {
        setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        console.log("Données sauvegardées :", editedUser);
        setIsEditing(false);
    };

    console.log(user);
    
    const handleSubmit = () => {
        if (!user || !user._id) {
            console.error("Utilisateur non connecté !");
            return;
        }

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

        fetch("http://localhost:3000/ads", {
            method: 'POST',
            headers: { "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify(adData),
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.data) {
                console.log("Annonce enregistrée avec succès :", data.data);
            } else {
                console.error("Erreur lors de l'enregistrement :", data.message);
            }
        })
        .catch(error => console.error("Erreur du serveur :", error));
    };

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
                            <label><input type="radio" name="gender" value="male" onChange={() => setGender("male")} />Mâle</label>
                            <label><input type="radio" name="gender" value="female" onChange={() => setGender("female")} />Femelle</label>
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
                        <p className={styles.dataInfo}><strong>Posté le :</strong> {ad?.publicationDate ? new Date(ad.publicationDate).toLocaleString() : "Date inconnue"} </p>
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
        </>
    );
}