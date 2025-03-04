import { useState } from 'react';
import Header from '../components/Header';
import SocialLoginButtons from '../components/SocialLoginButtons';
import styles from '../styles/Signup.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

function SignUpPage() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        gender: '',
        adresse: '',
        phoneNumber: '',
        mail: '',
        password: '',
        registrationQuestionnaire: {
            jardin: null,
            enfants: null,
            animaux: null,
            veterinaire: null,
            motivation: '',
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleQuestionnaire = (question, value) => {
        setFormData({
            ...formData,
            registrationQuestionnaire: {
                ...formData.registrationQuestionnaire,
                [question]: value,
            },
        });
    };

    const handleSubmit = () => {
        fetch('http://localhost:3000/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
        .then(res => res.json())
        .then(data => {
            if (data.result) {
                alert('Inscription réussie !');
                setFormData({
                    firstname: '',
                    lastname: '',
                    gender: '',
                    adresse: '',
                    phoneNumber: '',
                    mail: '',
                    password: '',
                    registrationQuestionnaire: {
                        jardin: null,
                        enfants: null,
                        animaux: null,
                        veterinaire: null,
                        motivation: '',
                    },
                });
            } else {
                alert(`Erreur : ${data.error}`);
            }
        })
        .catch(err => console.error('Erreur fetch:', err));
    };

    return (
        <div className={styles.signupContainer}>
            <Header />
            <h2>PAGE INSCRIPTION</h2>
            <SocialLoginButtons />

            <div className={styles.formWrapper}>
                <div className={styles.leftContent}>
                    {[
                        { name: 'firstname', label: 'Prénom', placeholder: 'Ex : Jean' },
                        { name: 'lastname', label: 'Nom', placeholder: 'Ex : Jacques' },
                        { name: 'adresse', label: 'Adresse', placeholder: 'Ex : 12 rue des Lilas' },
                        { name: 'phoneNumber', label: 'Téléphone', placeholder: 'Ex : 0601020304' },
                        { name: 'mail', label: 'Email', placeholder: 'Ex : jeanjacques@mail.com' },
                        { name: 'password', label: 'Mot de passe', type: 'password', placeholder: 'Créez votre mot de passe' },
                    ].map(({ name, label, type = 'text' }) => (
                        <fieldset key={name} className={styles.field}>
                            <label className={styles.label}>{label}</label>
                            <input
                                className={styles.answer}
                                type={type}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                            />
                        </fieldset>
                    ))}

                    <fieldset className={styles.field}>
                        <label className={styles.label}>Genre</label>
                        <div className={styles.radioGroup}>
                            {['Homme', 'Femme', 'Non genré'].map(option => (
                                <label key={option}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={option}
                                        checked={formData.gender === option}
                                        onChange={handleChange}
                                        className={styles.radioGroupOption}
                                    />
                                  <span>{option}</span>
                                </label>
                            ))}
                        </div>
                    </fieldset>
                </div>

                <div className={styles.rightContent}>
                    {[
                        { question: 'jardin', label: 'Disposez-vous d’un jardin ?' },
                        { question: 'enfants', label: 'Avez-vous des enfants ?' },
                        { question: 'animaux', label: 'Avez-vous (ou avez-vous déjà eu) des animaux ?' },
                        { question: 'veterinaire', label: 'Êtes-vous à proximité d’un vétérinaire ?' },
                    ].map(({ question, label }) => (
                        <fieldset key={question} className={styles.questionBlock}>
                            <legend className={styles.legend}>{label}</legend>
                            <div className={styles.options}>
                                {['oui', 'non'].map(choice => (
                                    <button
                                        key={choice}
                                        type="button"
                                        className={`${styles.button} ${formData.registrationQuestionnaire[question] === choice ? styles.active : ''}`}
                                        onClick={() => handleQuestionnaire(question, choice)}
                                    >
                                        {choice.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </fieldset>
                    ))}

                    <fieldset className={styles.questionBlock}>
                        <legend className={styles.legend}>Pourquoi souhaitez-vous adopter/donner cet animal ?</legend>
                        <textarea
                            className={styles.response}
                            value={formData.registrationQuestionnaire.motivation}
                            onChange={(e) => handleQuestionnaire('motivation', e.target.value)}
                        />
                    </fieldset>
                </div>
            </div>

            <button className={`${styles.submitButton}`} onClick={handleSubmit}>
                <FontAwesomeIcon icon={faPlay} />
            </button>
        </div>
    );
}

export default SignUpPage;
