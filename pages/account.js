import styles from '../styles/Account.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Calendar from '../components/Calendar';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { login } from '../reducers/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { faCircleDown, faArrowDown, faPenToSquare, faSave } from '@fortawesome/free-solid-svg-icons';

function AccountPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector(state => state.user);
    const [profileImage, setProfileImage] = useState(user?.profilePhoto || null); 

    useEffect(() => {
        setProfileImage(user?.profilePhoto || null);
    }, [user?.profilePhoto]);

    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({
        firstname: user?.firstname || '',
        lastname: user?.lastname || '',
        gender: user?.gender || '',
        adresse: user?.adresse || '',
        phoneNumber: user?.phoneNumber || '',
        mail: user?.mail || '',
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    const goToPublication = () => {
        router.push('/publication');
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch('http://localhost:3000/users/update-profile', {
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

    const handleDrop = async (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];

        if (file && file.type.startsWith('image/')) {
            const formData = new FormData();
            formData.append('profilePhoto', file);
            formData.append('token', localStorage.getItem('token'));

            console.log("Envoi de l'image :", file.name);

            try {
                const response = await fetch('http://localhost:3000/users/upload-profile-photo', {
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

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleRemovePhoto = async () => {
        try {
            const response = await fetch('http://localhost:3000/users/delete-profile-photo', {
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
                <h1>Bienvenue {user.firstname} !</h1>
                <p className={styles.reminderText}>Pensez à mettre vos informations personnelles 
                    à jour afin de faciliter le bon fonctionnement de la plateforme.</p>

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
                                    <p>{user.firstname}</p>
                                    <p>{user.lastname}</p>
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
                        <div>
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