import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../reducers/users';

function AccountPage() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.value[0]);

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        if (!userId) {
            console.error('Aucun ID utilisateur trouvé');
            return;
        }

        fetch(`http://localhost:3000/users/${userId}`) 
        .then(response => response.json())
        .then(data => {
            if (data.result) {
                dispatch(setUsers([data.user]));
            } else {
                console.error("Erreur de la récupération de l'identité de l'utilisateur");
            }
        });
    }, [dispatch]);

    if (!user) {
        return <p>Chargement des informations utilisateur...</p>;
    }

    return (
        <div className={styles.account-container}>
            <h1>MON COMPTE</h1>
            <p>Pensez à mettre vos informations personnelles 
                à jour afin de faciliter le bon fonctionnement 
                de la plateforme.</p>

                <div className={styles.profile-section}>
                    <div className={styles.profile-info}>
                        <h2>VOTRE PROFIL</h2>
                        <p>{user.firstname}</p>
                        <p>{user.lastname}</p>
                        <p>{user.gender}</p>
                        <p>{user.adresse}</p>
                        <p>{user.phoneNumber}</p>
                        <p>{user.mail}</p>
                    </div>
                    <div className={styles.profile-photo}>
                        <p>Importez votre photo de profil</p>
                    </div>
                    <div className={styles.calendar}>
                    </div>
                </div>

                <div className={styles.actions}>
                    <div className={styles.contracts}>
                        <button>Voir la liste de vos contrats</button>
                    </div>
                    <div className={styles.contacts}>
                        <button>Voir la liste de vos contrats</button>
                    </div>
                </div>
        </div>
    );
}

export default AccountPage;