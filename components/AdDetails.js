import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/AdDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../reducers/adDetails";

const AdDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const adData = useSelector((state) => state.adDetails.value);

  useEffect(() => {
    if (!id) return; // Ne rien faire si l'ID est undefined

    fetch(`http://localhost:3000/ads/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Annonce non trouvée");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Données reçues :", data);
        dispatch(addData(data)); // Stockage des données dans Redux
        console.log("Données stockées dans Redux :", data);
      })
      .catch((error) => console.error("Erreur :", error.message));
  }, [id]);

  console.log("adData actuel :", adData);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.divNav}>
        <Link href="/">
          <span className={styles.link}>Annonces</span>
        </Link>
        <Link href="/favorites">
          <span className={styles.link}>Favoris</span>
        </Link>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.divLeft}>
          <div className={styles.imgBlock1}>
            <img
              className={styles.img1}
              src={adData.pictures?.[0] || "/images/default-image.jpg"}
              alt="Annonce"
            />
            <div className={styles.imgBlock2}>
              <img
                className={styles.img2}
                src={adData.pictures?.[1] || "/images/default-image.jpg"}
                alt="Annonce"
              />
              <img
                className={styles.img3}
                src={adData.pictures?.[2] || "/images/default-image.jpg"}
                alt="Annonce"
              />
            </div>
          </div>
          <div className={styles.searchBar}>
                  <div className={styles.type}>{adData.sort?.toUpperCase() || "Sort"}</div>
                  <div className={styles.age}>{adData.age?.toUpperCase() || "Age"}</div>
                  <div className={styles.genre}>{adData.gender?.toUpperCase() || "Gender"}</div>
            </div>

            <div className={styles.description}>
                <h2>DESCRIPTION</h2>
              {adData.description || "Description non disponible"}
            </div>
        </div>

        <div className={styles.divRight}>
          <div className={styles.infoCard}>
            <div className={styles.name}>
              {adData.author?.firstname || "Firstname"}{" "}
              {adData.author?.lastname || "Firstname"}
            </div>
            <div className={styles.mail}>
              {adData.author?.mail || "Email non disponible"}
            </div>
            <h3 className={styles.h3}>Annonce</h3>
            <div className={styles.date}>
              Publiée le{" "}
              {adData.publicationDate
                ? new Date(adData.publicationDate)?.toLocaleDateString("fr-FR")
                : "Date non disponible"}
            </div>
            <div className={styles.city}>
              {adData.city || "Ville non disponible"}
            </div>
            <div className={styles.postalCode}>
              {adData.postalCode || "Code postale non disponible"}
            </div>
            <div className={styles.divBtn}>
              <Link href="/messaging">
                <button className={styles.button}>ENVOYER UN MESSAGE</button>
              </Link>
            </div>
            
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdDetails;
