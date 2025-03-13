import styles from '../styles/Home.module.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from 'next/link';
import Card from './Card';
import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';
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
    fetch("http://localhost:3000/ads")
      .then((response) => response.json())
      .then((data) => {
        console.log("Toutes les annonces récupérées :", data);
        setAds(data); // Toutes les annonces sont stockées 
        setAdsData(data); // adsData est initialisé pour l'affichage
      });

  }, []);
  
  useEffect(() => {
    if (!user.token) return;
    console.log(token);

    fetch(`http://localhost:3000/users/${user.token}`)  // Route pour récupérer les favoris de la BDD
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(setFavorites(data.user.favoriteA)); // Met à jour Redux avec les favoris récupérés
        }
      })
      .catch((error) => console.error("Erreur récupération favoris", error));
  }, [user.token]); // Se déclenche lorsque le token change

  const cards = adsData.map((card, i) => {
    const isFav = favorites.includes(card._id)
    return <Card 
      key={i} 
      id={card._id}
      picture={card.pictures[0]} 
      type={card.sort} 
      age={card.age} 
      genre={card.gender} 
      nombre={card.number} 
      description={card.description} 
      ville={card.city} 
      codePostale={card.postalCode} 
      isFav = {isFav} />
  });

  return (
    <div className={styles.container}>
      <Header />
      <Navbar ads={ads} setFilteredAds={setAdsData} />
      {/* <div className={styles.searchBar}>
        <div className={styles.type}>
          <p className={styles.h4}>Type</p>
          <select
            id="type"
            onChange={(e) => setType(e.target.value)}
            value={type}
            className={styles.select}
          >
            <option value="" disabled className={styles.placeholder}>Choisir un type</option>
            <option value="chat" className={styles.option}>Chat</option>
            <option value="chien" className={styles.option}>Chien</option>
          </select>
        </div>
        <div className={styles.age}>
          <p className={styles.h4}>Âge</p>
          <select
            id="age"
            onChange={(e) => setAge(e.target.value)}
            value={age}
            className={styles.select}
          >
            <option value="" disabled className={styles.placeholder}>Junior ou senior ?</option>
            <option value="junior" className={styles.option}>Junior</option>
            <option value="senior" className={styles.option}>Senior</option>
          </select>
        </div>
        <div className={styles.genre}>
          <p className={styles.h4}>Genre</p>
          <select
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
            value={genre}
            className={styles.select}
          >
            <option value="" disabled className={styles.placeholder}>Femelle ou mâle</option>
            <option value="male" className={styles.option}>Male</option>
            <option value="femelle" className={styles.option}>Femelle</option>
          </select>
        </div>
        <div>
           <button className={styles.btnSearch}>
            <FontAwesomeIcon icon={faSearch} /> 
            </button>
       </div>
      </div> */}

      <div className={styles.divNav}>
        <Link href="/"><span className={styles.link}>Annonces</span></Link>
        <Link href="/favorites"><span className={styles.link}>Favoris</span></Link>
      </div>

      <hr className={styles.line}/>

      <div className={styles.divAds}>
      {adsData.length > 0 ? (
       adsData.map((ad, i) => (
        <Card 
          id={ad._id}
          key={i}
          type={ad.sort}
          age={ad.age}
          genre={ad.gender}
          picture={ad.pictures[0]}
          description={ad.description}
          ville={ad.city}
          codePostale={ad.postalCode}
        />
      ))
    ) : (
      <p>Aucune annonce trouvée.</p>
    )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
