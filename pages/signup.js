import Header from '../components/Header';
import SocialLoginButtons from '../components/SocialLoginButtons';
import styles from '../styles/Signup.module.css';

function SignUpPage() {
    return (
        <div className={styles.signupContainer}>
            <Header />
            <h2>PAGE INSCRIPTION</h2>
            <SocialLoginButtons />
            <div className={styles.formWrapper}>
                <div className={styles.leftContent}>
                <fieldset className={styles.field}>
                    <label>
                        <legend className={styles.legend}>Prénom<input className={styles.answer} type="text" /></legend>
                    </label>
                </fieldset>
                <fieldset className={styles.field}>
                    <label>
                        <legend className={styles.legend}>Nom<input className={styles.answer} type="text" /></legend>
                    </label>
                </fieldset> 
                <fieldset className={styles.field}>
                    <label>
                        <legend className={styles.legend}>Civilité<input className={styles.answer} type="text" /></legend>
                    </label>
                </fieldset> 
                <fieldset className={styles.field}>
                    <label>
                        <legend className={styles.legend}>Adresse<input className={styles.answer} type="text" /></legend>
                    </label>
                </fieldset> 
                <fieldset className={styles.field}>
                    <label>
                        <legend className={styles.legend}>Téléphone<input className={styles.answer} type="text" /></legend>
                    </label>
                </fieldset> 
                <fieldset className={styles.field}>
                    <label>
                        <legend className={styles.legend}>Mail<input className={styles.answer} type="text" /></legend>
                    </label>
                </fieldset>
                <fieldset className={styles.field}>
                    <label>
                        <legend className={styles.legend}>Mot de passe<input className={styles.answer} type="text" /></legend>
                    </label>
                </fieldset>       
                </div>

                <div className={styles.rightContent}>
                    <fieldset className={styles.questionBlock}>
                        <legend className={styles.legend}>Disposez vous d’un jardin ?</legend>
                        <div className={styles.options}>
                            <label>
                                <button className={styles.button}>OUI</button>
                            </label>
                            <label>
                                <button className={styles.button}>NON</button>
                            </label>
                        </div>
                    </fieldset>
                    <fieldset className={styles.questionBlock}>
                        <legend className={styles.legend}>Avez-vous des enfants ?</legend>
                        <div className={styles.options}>
                            <label>
                                <button className={styles.button}>OUI</button>
                            </label>
                            <label>
                                <button className={styles.button}>NON</button>
                            </label>
                        </div>
                    </fieldset>
                    <fieldset className={styles.questionBlock}>
                        <legend className={styles.legend}>Avez-vous (ou avez-vous déjà eu) des animaux ?</legend>
                        <div className={styles.options}>
                            <label>
                                <button className={styles.button}>OUI</button>
                            </label>
                            <label>
                                <button className={styles.button}>NON</button>
                            </label>
                        </div>
                    </fieldset>
                    <fieldset className={styles.questionBlock}>
                        <legend className={styles.legend}>Êtes-vous à proximité d’un vétérinaire ?</legend>
                        <div className={styles.options}>
                            <label>
                                <button button className={styles.button}>OUI</button>
                            </label>
                            <label>
                                <button button className={styles.button}>NON</button>
                            </label>
                        </div>
                    </fieldset>
                    <fieldset className={styles.questionBlock}>
                        <legend className={styles.legend}>Pourquoi souhaitez-vous adopter / donner cet animal ?</legend>
                        <div>
                            <label>
                                <input className={styles.response} type="text" placeholder="Texte" />
                            </label>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;