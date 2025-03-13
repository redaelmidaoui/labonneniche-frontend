import styles from "../styles/Card.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "../reducers/favorites";
import Link from "next/link";

function Card(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites.value);

  const handleFavoriteClick = () => {
    if (!user.token) return;

    //  On ajoute ou retire l'annonce des favoris
    const newFavorites = props.isFav
      ? favorites.filter((fav) => fav !== props.id)
      : [...favorites, props.id];

    //  Route pour mettre à jour les favoris
    fetch("http://localhost:3000/users/addFavorites", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: user.token,
        favorites: newFavorites, //  On envoie le tableau mis à jour
      }),
    })
      .then((response) => response.json())
      .then(() => {
        dispatch(setFavorites(newFavorites)); //  Mise à jour Redux
        console.log("Nouveaux favoris après mise à jour:", newFavorites);
      })
      .catch((error) => console.error("Erreur mise à jour favoris", error));
  };

  //  On change la couleur du coeur si l'annonce est dans les favoris
  let iconStyle = {};
  if (props.isFav) {
    iconStyle = { color: "#01A076" };
  }

  return (
    <div className={styles.divCard}>
      <div className={styles.card}>
        <Link href={`/adDetails/${props.id}`}>
          <div className={styles.image}>
            <Image
              src={props.picture}
              alt={props.title}
              width={300}
              height={260}
              style={{
                borderRadius: "30px", // Applique un border-radius directement à l'image
              }}
            ></Image>
          </div>
        </Link>
        <div className={styles.heart}>
          <FontAwesomeIcon
            icon={faHeart}
            onClick={() => handleFavoriteClick()}
            style={iconStyle}
            size="2x"
          />
        </div>
        <Link href={`/adDetails/${props.id}`}>
          <div className={styles.infosCard}>
            <p className={styles.type}>Type: {props.type}</p>
            <p className={styles.type}>Âge: {props.age}</p>
            <p className={styles.type}>Genre: {props.genre}</p>
            <p>Description: {props.description}</p>
            <div className={styles.adresse}>
              {props.ville} {props.codePostale}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Card;
