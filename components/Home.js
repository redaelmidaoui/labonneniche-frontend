import styles from '../styles/Home.module.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; 
import Link from 'next/link';
import Card from './Card';
import Header from './Header';
import Footer from './Footer';
import { setFavorites } from "../reducers/favorites";

function Home() {
  const [type, setType] = useState("");
  const [age, setAge] = useState("");
  const [genre, setGenre] = useState("");
  const [adsData, setAdsData] = useState([]);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.value);
  const user = useSelector((state) => state.user.value);

  const router = useRouter();

  useEffect(() => {
    if (!user.token) return;

    fetch(`http://localhost:3000/users/${user.token}`)  // Route pour récupérer les favoris de la BDD
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(setFavorites(data.user.favoriteAds)); // Met à jour Redux avec les favoris récupérés
        }
      })
      .catch((error) => console.error("Erreur récupération favoris", error));
  }, [user.token]); // Se déclenche lorsque le token change


  useEffect(() => {
    fetch('http://localhost:3000/ads')
      .then(response => response.json())
      .then(data => {
        setAdsData(data.reverse());
      });
  }, []);

  const cards = adsData.map((card) => {
    const isFav= favorites.includes(card._id)
    return <Card 
      key={card._id} 
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
      <div className={styles.searchBar}>
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
      </div>

      <div className={styles.divNav}>
        <Link href="/"><span className={styles.link}>Annonces</span></Link>
        <Link href="/favorites"><span className={styles.link}>Favoris</span></Link>
      </div>

      <div className={styles.divAds}>
        {cards}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
