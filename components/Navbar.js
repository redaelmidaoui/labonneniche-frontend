import React, { useState } from "react";
import styles from "../styles/Navbar.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from "react";

const Navbar = ({ ads, setFilteredAds }) => {
    const [type, setType] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");

    const handleFilter = () => {
        console.log("handleFilter exécuté !");
        console.log("Annonces disponibles avant filtrage :", ads);

        if (!ads || !Array.isArray(ads)) {
            console.error("Erreur : ads est undefined ou n'est pas un tableau !");
            return;
        }
        
        let filteredAds = [...ads];

        if (type) filteredAds = filteredAds.filter(ad => ad.sort === type);
        console.log(`Filtre type (${type}) appliqué :`, filteredAds);
        if (age) filteredAds = filteredAds.filter(ad => ad.age === age);
        console.log(`Filtre âge (${age}) appliqué :`, filteredAds);
        if (gender) filteredAds = filteredAds.filter(ad => ad.gender === gender);
        console.log(`Filtre genre (${gender}) appliqué :`, filteredAds);

        console.log("Annonces après filtrage :", filteredAds);

        setFilteredAds(filteredAds);
        console.log("Annonces après filtrage envoyées à Home.js :", filteredAds);

    };

    useEffect(() =>{
        if (ads && ads.length > 0) {
            handleFilter();
        }
    }, [type, age, gender]);

    return (
        <div className={styles.navbar}>
            <div className={styles.divNavbar}>
                <label className={styles.navbarItem}>Type</label>
                <select className={styles.dropdownMenuDiv} value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="">Chat ou chien ?</option>
                    <option value="chien">Chien</option>
                    <option value="chat">Chat</option>
                </select>
            </div>
            <div className={styles.divNavbar}>
                <label className={styles.navbarItem}>Âge</label>
                <select className={styles.dropdownMenuDiv} value={age} onChange={(e) => setAge(e.target.value)}>
                    <option value="">Junior ou senior ?</option>
                    <option value="junior">Junior</option>
                    <option value="senior">Senior</option>
                </select>
            </div>
            <div className={styles.divNavbar}>
                <label className={styles.navbarItem}>Genre</label>
                <select className={styles.dropdownMenuDiv} value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">Femelle ou mâle ?</option>
                    <option value="male">Mâle</option>
                    <option value="femelle">Femelle</option>
                    <option value="les 2">Les 2</option>
                </select>
            </div>
            <button className={styles.searchButton} onClick={handleFilter}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
            </button>

            
        </div>
    );
};

export default Navbar;