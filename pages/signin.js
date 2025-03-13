import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import Header from '../components/Header';
import SocialLoginButtons from '../components/SocialLoginButtons';
import styles from '../styles/Signin.module.css';
import { useRouter } from 'next/router';

function SignInPage() {
    const dispatch = useDispatch();
    const router = useRouter();

    const [formData, setFormData] = useState({
        mail: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/users/signin', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
         })
         
        .then(res => res.json())
        .then(data => {
            console.log("Signin data :", data);
            if (data.result) {
                dispatch(login( data.newDoc ));
                localStorage.setItem('token', data.newDoc.token);

                setFormData({ mail: '', password: '' });
                router.push('/');
            } else {
                alert(`Erreur : ${data.error}`);
            }
        })
        .catch(() => alert("Impossible de contacter le serveur. Veuillez réessayer"));
    };

    return (
        <div className={styles.signinContainer}>
            <Header />
            <SocialLoginButtons />
            
            <hr className={styles.line}/>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <label className={styles.label}>Email</label>
                    <input
                        className={styles.input}
                        type="email"
                        name="mail"
                        value={formData.mail}
                        onChange={handleChange}
                        placeholder="Entrez votre email"
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Mot de passe</label>
                    <input
                        className={styles.input}
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Entrez votre mot de passe"
                        required
                    />
                </div>

                <button className={styles.submitButton} type="submit">Se connecter</button>
            </form>
        </div>
    );
}

export default SignInPage;
