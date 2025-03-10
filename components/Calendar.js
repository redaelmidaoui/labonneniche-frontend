import { useState, useEffect } from 'react';
import styles from '../styles/Calendar.module.css';

function Calendar({ userToken }) {
    // Stocke les dates sélectionnées (indisponibilités et rendez-vous)
    const [selectedDates, setSelectedDates] = useState({ unavailable: [], appointments: [] });

    // Mode d'édition (choisir entre "unavailable" ou "appointments")
    const [mode, setMode] = useState('');

    // Stocke la date actuelle pour afficher le bon mois et année
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Charge les données du calendrier depuis le backend quand le composant s'affiche
    useEffect(() => {
        fetch(`http://localhost:3000/users/calendar/${userToken}`)
            .then(res => res.json())
            .then(data => {
                if (data.result) {
                    setSelectedDates({
                        unavailable: data.unavailable || [],
                        appointments: data.appointments || []
                    });
                }
            })
            .catch(err => console.error("Erreur de chargement du calendrier", err));
    }, [userToken]); // Assure que les données se rechargent quand le token change

    // Fonction pour récupérer le nombre de jours dans le mois actuel
    const getDaysInMonth = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1).getDay(); // Jour de la semaine où commence le mois (0 = dimanche, 1 = lundi)
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Nombre total de jours dans le mois
        return { firstDay, daysInMonth };
    };

    // Fonction pour gérer le clic sur un jour du calendrier
    const handleDateClick = (day) => {
        if (!mode) return; // Si aucun mode n'est sélectionné, on ne fait rien
    
        let newUnavailable = [...selectedDates.unavailable];
        let newAppointments = [...selectedDates.appointments];
    
        if (mode === 'unavailable') {
            if (newUnavailable.includes(day)) {
                newUnavailable = newUnavailable.filter(d => d !== day);
            } else {
                newUnavailable.push(day);
                newAppointments = newAppointments.filter(d => d !== day); // On enlève des rendez-vous
            }
        } else if (mode === 'appointments') {
            if (newAppointments.includes(day)) {
                newAppointments = newAppointments.filter(d => d !== day);
            } else {
                newAppointments.push(day);
                newUnavailable = newUnavailable.filter(d => d !== day); // On enlève des indisponibilités
            }
        }
    
        // Mise à jour de l'état local
        setSelectedDates({ unavailable: newUnavailable, appointments: newAppointments });
    
        // Envoi des modifications au backend
        fetch('http://localhost:3000/users/update-calendar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: userToken, unavailable: newUnavailable, appointments: newAppointments })
        })
        .catch(err => console.error("Erreur d'enregistrement du calendrier", err));
    };

    const { firstDay, daysInMonth } = getDaysInMonth();
    const days = [...Array(daysInMonth)].map((_, i) => i ); // Crée un tableau [jours du mois]
    const emptyDays = [...Array(firstDay)].map((_, i) => i); // Jours vides avant le premier jour du mois

    return (
        <div className={styles.calendarContainer}>
            <h3 className={styles.month}>{currentMonth.toLocaleString('fr-FR', { month: 'long'})}</h3>
            <div className={styles.calendarGridDay}>
                <div className={styles.weekDays}>
                    {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((day, index) => (
                        <div key={index} className={styles.weekDay}>{day}</div>
                    ))}
                </div>
            </div>
            <div className={styles.calendarGrid}>
                    {emptyDays.map((_, i) => <div key={`empty-${i}`} className={styles.empty}></div>)}
                    {days.map(day => (
                        <div 
                            key={day} 
                            className={`${styles.day} 
                                        ${selectedDates.unavailable.includes(day) ? styles.unavailable : ''} 
                                        ${selectedDates.appointments.includes(day) ? styles.appointment : ''}`}
                            onClick={() => handleDateClick(day)}
                        >
                            {day}
                    </div>
                ))}
            </div>
            <div className={styles.buttons}>
                <button onClick={() => setMode('unavailable')} className={styles.unavailableButton}>INDISPONIBILITÉS</button>
                <button onClick={() => setMode('appointments')} className={styles.appointmentButton}>RENDEZ-VOUS</button>
            </div>
        </div>
    );
}

export default Calendar;