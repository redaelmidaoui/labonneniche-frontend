import styles from '../styles/Account.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Calendar from '../components/Calendar';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router'; // Importation du hook de navigation de Next.js
import { login } from '../reducers/user'; // Importation de l'action Redux pour mettre à jour l'utilisateur
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { faCircleDown, faArrowDown, faPenToSquare, faSave } from '@fortawesome/free-solid-svg-icons';

function AccountPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector(state => state.user); // Récupération des informations utilisateur depuis Redux
    const [profileImage, setProfileImage] = useState(user?.profilePhoto || null); // État pour stocker la photo de profil

    function capitalize(str) {
        return str ? str.trim().charAt(0).toUpperCase() + str.trim().slice(1).toLowerCase() : "";
    }

    // Met à jour la photo de profil lorsqu'elle change dans Redux
    useEffect(() => {
        console.log("User dans Redux après mise à jour :", user);
        setProfileImage(user?.profilePhoto || null);
    }, [user?.profilePhoto]);

    // État pour gérer l'édition du profil
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({
        firstname: user?.firstname || '',
        lastname: user?.lastname || '',
        gender: user?.gender || '',
        adresse: user?.adresse || '',
        phoneNumber: user?.phoneNumber || '',
        mail: user?.mail || '',
    });

    // Active le mode édition
    const handleEditClick = () => {
        setIsEditing(true);
    };

    // Met à jour les informations saisies par l'utilisateur
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    // Redirige vers la page de publication
    const goToPublication = () => {
        router.push('/publication');
    };

    // Sauvegarde les modifications du profil utilisateur
    const handleSaveChanges = async () => {
        try {
            const response = await fetch('https://labonneniche-backend.vercel.app/users/update-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token:localStorage.getItem('token'), ...editedData }),
            });

            const data = await response.json();
            if (data.result) {
                dispatch(login({ ...user, ...editedData }));
                setIsEditing(false);
            } else {
                console.error("Erreur lord de la mise à jour des informations du profil utilisateur");
            }
        } catch (error) {
            console.error("erreur du serveur", error);
        }
    };

    // Gestion du glisser-déposer de la photo de profil
    const handleDrop = async (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];

        if (file && file.type.startsWith('image/')) {
            const formData = new FormData();
            formData.append('profilePhoto', file);
            formData.append('token', localStorage.getItem('token'));

            console.log("Envoi de l'image :", file.name);

            try {
                const response = await fetch('https://labonneniche-backend.vercel.app/users/upload-profile-photo', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                console.log("Réponse du serveur :", data);

                if (data.result) {
                    setProfileImage(data.profilePhoto); // La photo de profile est mise à jour et s'affiche
                    dispatch(login({ ...user, profilePhoto: data.profilePhoto })); // La mise à jour est transmise à Redux ici
                    console.log("Image mise à jour :", data.profilePhoto);
                } else {
                    console.error("Erreur lors de l'import du fichier photo");
                }
            } catch (error) {
                console.error("Erreur du serveur", error);
            }
        }
    };

    // Permet le glisser-déposer sans déclencher d'autres événements
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    // Suppression de la photo de profil
    const handleRemovePhoto = async () => {
        try {
            const response = await fetch('https://labonneniche-backend.vercel.app/users/delete-profile-photo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: localStorage.getItem('token') }),
            });

            const data = await response.json();
            if (data.result) {
                setProfileImage(null);
                dispatch(login({ ...user, profilePhoto: '' }));
            }
        } catch (error) {
            console.error("Erreur du serveur", error);
        }
    };

    if (!user) {
        return <p>Chargement...</p>;
    }
    
    return (
        <div>
            <Header />
            <div className={styles.accountContainer}>
                <h1 className={styles.title}>Bienvenue {capitalize(user.firstname)} !</h1>
                <p className={styles.reminderText}>Pensez à mettre vos informations personnelles 
                    à jour afin de faciliter le bon fonctionnement de la plateforme.</p>

                    <hr className={styles.line}/>

                    <div className={styles.profileSection}>
                        <div className={styles.profileInfo}>
                            <h2>VOTRE PROFIL</h2>
                            {isEditing ? (
                                <>
                                    <input className={styles.input} type="text" name="firstname" placeholder="Prénom" value={editedData.firstname} onChange={handleInputChange} />
                                    <input className={styles.input} type="text" name="lastname" placeholder="Nom" value={editedData.lastname} onChange={handleInputChange} />
                                    
                                    <fieldset className={styles.radioField}>
                                        <legend className={styles.label}>Genre</legend>
                                        <div className={styles.radioGroup}>
                                            {['Homme', 'Femme', 'Non genré'].map(option => (
                                                <label key={option} className={styles.radioLabel}>
                                                    <input type="radio"
                                                           name="gender"
                                                           value={option}
                                                           checked={editedData.gender === option}
                                                           onChange={handleInputChange}
                                                           className={styles.radioGroupOption}
                                                    />
                                                    <span className={styles.option}>{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </fieldset>

                                    <input className={styles.input} type="text" name="adresse" placeholder="Adresse" value={editedData.adresse} onChange={handleInputChange} />
                                    <input className={styles.input} type="text" name="phoneNumber" placeholder="Numéro de téléphone" value={editedData.phoneNumber} onChange={handleInputChange} />
                                    <input className={styles.input} type="text" name="mail" placeholder="Mail" value={editedData.mail} onChange={handleInputChange} />
                                </>
                            ) : (
                                <>
                                    <p>{capitalize(user.firstname)}</p>
                                    <p>{capitalize(user.lastname)}</p>
                                    <p>{user.gender}</p>
                                    <p>{user.adresse}</p>
                                    <p>{user.phoneNumber}</p>
                                    <p>{user.mail}</p>
                                </>
                            )}     
                        </div>
                    
                        <div className={`${styles.profilePhoto} ${profileImage ? styles.noBorder : ''}`}
                             onDrop={handleDrop}
                             onDragOver={handleDragOver}
                        >
                            {profileImage ? (
                            <>
                                <img src={profileImage} alt="Photo de profil" className={styles.profileImage} />
                                <div>
                                    <p className={styles.modifyText} onClick={handleRemovePhoto}>Modifier la photo de profil</p>
                                </div>
                                
                            </>
                        ) : (
                            <>
                            <p className={styles.mention}>Importez<br></br>votre photo de profil</p>
                            <FontAwesomeIcon className={styles.photoIcon} icon={faCircleDown} />
                            </>
                        )}
                        </div>
                        
                        <Calendar userToken={user.token} />
                        
                    </div>

                    <div>
                        <button className={styles.editButton} onClick={isEditing ? handleSaveChanges : handleEditClick}>
                            <FontAwesomeIcon icon={isEditing ? faSave : faPenToSquare} />
                            {isEditing ? "Enregistrer" : "Modifier les informations"}
                        </button>
                    </div>

                    <div className={styles.actions}>
                        <div className={styles.margin}>
                            <Link href="/myAds"><button className={styles.button}><FontAwesomeIcon icon={faArrowDown} className={styles.buttonIcon}/>Voir la liste<br></br>de vos annonces</button></Link>
                        </div>
                        <div>
                            <button className={styles.buttonRight}><FontAwesomeIcon icon={faArrowDown} className={styles.buttonIcon} />Voir la liste<br></br>de vos contacts</button>
                        </div>
                        <div>
                            <button className={styles.buttonRightPublication} onClick={goToPublication}><FontAwesomeIcon icon={faPenToSquare} className={styles.buttonIcon} />Publier<br></br>une annonce</button>
                        </div>
                    </div>
            </div>
            <Footer />
        </div>
    );
}

export default AccountPage;