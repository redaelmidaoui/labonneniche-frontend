import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from './Header';
import Footer from './Footer';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Card from './Card';

function MyAds() {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.token); // Supposons que l'auteur est stocké ici
    const [ads, setAds] = useState([]); 
    const [id, setId] = useState('');

    useEffect(() => {
        if (token) {
          // Récupération de l'ID de l'utilisateur
          fetch(`https://labonneniche-backend.vercel.app/users/${token}`)
            .then((response) => response.json())
            .then((data) => {
              if (data.result) {
                setId(data.user._id); // Récupérer l'ID de l'utilisateur
              }
            })
            .catch((error) => console.error("Erreur récupération utilisateur", error));
        }
      }, [token]); // Quand le token change, ça récupère l'ID de l'utilisateur
    
      useEffect(() => {
        if (id) {
          // Une fois que l'ID est récupéré, on peut récupérer les annonces
          fetch(`https://labonneniche-backend.vercel.app/ads/myAds/${id}`)
            .then((response) => response.json())
            .then((data) => {
              console.log("Mes annonces récupérées :", data);
              setAds(data);
            })
            .catch((error) => console.error("Erreur récupération annonces", error));
        }
      }, [id]); // Quand l'ID de l'utilisateur est défini, on récupère les annonces

      console.log("Mes annonces actuelles :", ads);

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.divNav}>
                <Link href="/"><span className={styles.link}>Annonces</span></Link>
                <Link href="/favorites"><span className={styles.link}>Favoris</span></Link>
            </div>

            <h1>Mes Annonces</h1>
            <div className={styles.divAds}>
                {ads.length > 0 ? (
                    ads.map((card) => (
                        <Card
                            key={card._id}
                            id={card._id}
                            picture={card.pictures?.[0] || "https://via.placeholder.com/300"}
                            type={card.sort}
                            age={card.age} 
                            genre={card.gender}
                            description={card.description}
                            ville={card.city}
                            codePostale={card.postalCode}
                            isFav={false} // On ne veut pas de coeur sur les annonces de l'utilisateur
                        />
                    ))
                ) : (
                    <p>Aucune annonce trouvée.</p>
                )}
            </div>
            <Footer />
      </div>
    ) 
}

export default MyAds;