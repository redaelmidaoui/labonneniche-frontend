import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import Card from "./Card";
import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { setFavorites } from "../reducers/favorites";

function Home() {
  const [adsData, setAdsData] = useState([]);
  const [ads, setAds] = useState([]);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.value);
  const user = useSelector((state) => state.user);
  const token = user.token;
  const router = useRouter();

  const handleFilter = (filteredAds) => {
    console.log("Données filtrées reçues dans Home.js :", filteredAds);
    setAdsData(filteredAds);
  };

  useEffect(() => {
    fetch("https://labonneniche-backend.vercel.app/ads")
      .then((response) => response.json())
      .then((data) => {
        console.log("Toutes les annonces récupérées :", data);
        setAds(data); // Toutes les annonces sont stockées
        setAdsData(data.reverse()); // adsData est initialisé pour l'affichage
      });
  }, []);

  useEffect(() => {
    if (!user.token) return;
    console.log(token);

    fetch(`https://labonneniche-backend.vercel.app/users/${user.token}`) // Route pour récupérer les favoris de la BDD
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(setFavorites(data.user.favoriteA)); // Met à jour Redux avec les favoris récupérés
        }
      })
      .catch((error) => console.error("Erreur récupération favoris", error));
  }, [user.token]); // Se déclenche lorsque le token change

  const handleFavorites = () => {
    if (!user.token) {
      router.push("/login");
    } else {
      router.push("/favorites");
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <Navbar ads={ads} setFilteredAds={setAdsData} />
      <div className={styles.divNav}>
        <Link href="/">
          <span className={styles.link}>Annonces</span>
        </Link>
        <span onClick={handleFavorites} className={styles.link}>
          Favoris
        </span>
      </div>

      <hr className={styles.line} />

      <div className={styles.divAds}>
        {adsData.length > 0 ? (
          adsData.map((ad, i) => {
            const isFav = favorites.includes(ad._id);
            return (
              <Card
                key={i}
                id={ad._id}
                type={ad.sort}
                age={ad.age}
                genre={ad.gender}
                picture={ad.pictures[0]}
                description={ad.description}
                ville={ad.city}
                codePostale={ad.postalCode}
                isFav={isFav}
              />
            );
          })
        ) : (
          <p>Aucune annonce trouvée.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
