import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorites, setFavorites } from "../reducers/favorites";
import Link from 'next/link';
import Card from "./Card";
import Header from './Header';
import Footer from './Footer';
import styles from '../styles/Home.module.css';

const Favorites = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites.value); // Liste des favoris

  // useEffect(() => {
  //     dispatch(addToken("ZuPdxUcinProBYSMsduSRf5JCLWqZEIH"));
  //   }, [dispatch]);

  useEffect(() => {
    if (user.token) {
      
      fetch(`http://localhost:3000/users/${user.token}/favorites`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Données reçues :", data);
          if (data.result) {
            dispatch(setFavorites(data.favoriteA)); // Stocke directement les objets favoris
          }
        })
        .catch((error) =>
          console.error("Erreur récupération annonces favorites", error)
        );
    }
  }, [user.token]); // Déclenche l'effet uniquement si le token de l'utilisateur change

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.divNav}>
        <Link href="/"><span className={styles.link}>Annonces</span></Link>
        <Link href="/favorites"><span className={styles.link}>Favoris</span></Link>
      </div>

      <h1>Mes Favoris</h1>
      <div className={styles.divAds}>
        {favorites.length > 0 ? (
          favorites.map((card) => (
            <Card
              key={card._id}
              id={card._id}
              picture={card.pictures?.[0] || "https://via.placeholder.com/300"}
              type={card.sort}
              age={card.age}
              genre={card.gender}
              nombre={card.number}
              description={card.description}
              ville={card.city}
              codePostale={card.postalCode}
              isFav={true}
            />
          ))
        ) : (
          <p>Aucun favori pour l’instant.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Favorites;
