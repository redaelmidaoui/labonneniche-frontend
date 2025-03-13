import { useEffect, useState, useRef } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../styles/Messaging.module.css";
import Contact from "../components/Contact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
import Calendar from '../components/Calendar';

function Messaging() {
    const [contactList, setContactList] = useState([]);
    const [messageList, setMessageList] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [selectedContactId, setSelectedContactId] = useState(null);

    const user = useSelector((state) => state.user);
    console.log(user);


    // Création d'une référence pour le conteneur des messages
    const messagesEndRef = useRef(null);

    useEffect(() => {
        
        fetch(`http://localhost:3000/messaging/getMessaging/${user._id}`)
        .then(response => response.json())
        .then(data => {
            setContactList(data.messageries);
        });
        // Fonction pour faire défiler vers le bas chaque fois qu'un message est ajouté
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messageList]);

    const contactClickHandler = (id_messaging) => {
        setSelectedContactId(id_messaging);
        const findMessaging = contactList.find(item => item._id === id_messaging);

        if (findMessaging) {
            setMessageList(findMessaging.messages);
            console.log("Messages chargés :", findMessaging.messages);
        }
    }

    const contacts = contactList.map((data, key) => {
        const isSelected = selectedContactId === data._id;
        const lastMessage = data.messages[data.messages.length - 1];
        let date_last_message = "";
        if (data.messages.length !== 0) {
            date_last_message = new Date(lastMessage.date_of_dispatch);
        }
        return (
            <Contact 
                id={data._id} 
                key={key} 
                contact={data.user1._id !== user._id ? data.user1 : data.user2}
                onClick={() => contactClickHandler(data._id)}
                isSelected={isSelected}
            />
        );
    });

    const messages = (messageList || []).map((data, key) => {
        console.log("Message data:", data);
        const isSender = String(user._id) === String(data.id_editor);
        console.log("isSender:", isSender, "user._id:", user._id, "id_editor:", data.id_editor); 
        console.log(isSender)

        return (
            <div 
                className={`${styles.message} ${isSender ? styles.sentMessage : styles.receivedMessage}`} 
                key={key} 
                style={{ flexDirection: isSender ? "row-reverse" : "row" }}
            >
                <p>{data.content}</p>
            </div>
        );
    });

    console.log(user._id);

    const sendHandler = () => {
        if (messageText.trim() !== "") {  // Empêcher les messages vides
            const newMessage = { id_editor: String(user._id), content: messageText };
            setMessageList([...messageList, newMessage]);
            console.log("Nouveau message envoyé:", newMessage);
            fetch(`http://localhost:3000/messaging/addMessage/${selectedContactId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMessage)
            })
            setMessageText("");  // Réinitialiser le champ de texte
        }
    };

    return (
        <div className={styles.container}>
            <Header />
            <hr className={styles.line}/>
            <div className={styles.contentContainer}>
                <div className={styles.contactsContainer}>
                    <span className={styles.contacts}>{contacts}</span>
                </div>
                <div className={styles.messagingContainer}>
                    <div className={styles.messagesContainer}>
                        {messages}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className={styles.sendContainer}>
                        <input 
                            type="text" 
                            className={styles.messageInput} 
                            onChange={(e) => setMessageText(e.target.value)} 
                            value={messageText} 
                        />
                        <FontAwesomeIcon icon={faPaperPlane} onClick={sendHandler} />
                    </div>
                </div>
                <div className={styles.calendarContainer}>
                    <Calendar />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Messaging;

