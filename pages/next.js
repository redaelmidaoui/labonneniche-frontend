import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Next() {
    const router = useRouter();
    const { token, firstname } = router.query;

    const [user, setUser] = useState({
        token: '',
        firstname: '',
    });

    useEffect(() => {
        if (token && firstname) {
            setUser({ token, firstname });
        }
    }, [token, firstname]);

    return (
        <div>
            <h1>Bienvenue {user.firstname} !</h1>
            <p>On a bien récupéré ton token : {user.token}</p>
            <p>Tu peux maintenant compléter ton profil si besoin !</p>
            <div>
                <img src={"/images/chachat.jpg"} />
            </div>
        </div>
    );
}
