import { useEffect, useState, useRef } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../styles/Messaging.module.css";
import Contact from "../components/Contact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

function Messaging() {
    const [contactList, setContactList] = useState([]);
    const [messageList, setMessageList] = useState([]);
    const [messageText, setMessageText] = useState("");
    const id_user = "67c6e9a3a5d14622c404a6be";

    // Création d'une référence pour le conteneur des messages
    const messagesEndRef = useRef(null);

    useEffect(() => {
        setMessageList([{id_sender:"67c6e9a3a5d14622c404a6be", content:"Hello"}, {id_sender:"other", content:"Hi"}, {id_sender:"67c6e9a3a5d14622c404a6be", content:"So, I am interested to adopt your dog"}]);

        fetch(`http://localhost:3000/messaging/getMessaging/${id_user}`)
        .then(response => response.json())
        .then(data => {setContactList(data.messageries)});
    }, []);

    // Fonction pour faire défiler vers le bas chaque fois qu'un message est ajouté
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messageList]);

    const contacts = contactList.map((data, key) => {
        const lastMessage = data.messages[data.messages.length - 1];
        let date_last_message = "empty";
        if (data.messages.length !== 0) {
            date_last_message = new Date(lastMessage.date_of_dispatch);
        }
        return (
            <Contact 
                id={data._id} 
                key={key} 
                id_contact={data.id_user1 !== id_user ? data.id_user1 : data.id_user2} 
                date_last_message={date_last_message === "empty" ? date_last_message : `${date_last_message.getDate()}/${date_last_message.getMonth() + 1}/${date_last_message.getUTCFullYear()}`} 
            />
        );
    });

    const messages = messageList.map((data, key) => {
        return (
            <div 
                className={styles.message} 
                key={key} 
                style={{ flexDirection: id_user === data.id_sender ? "row-reverse" : "row" }}
            >
                <p>{data.content}</p>
            </div>
        );
    });

    const sendHandler = () => {
        if (messageText.trim() !== "") {  // Empêcher les messages vides
            setMessageList([...messageList, { id_sender: id_user, content: messageText }]);
            setMessageText("");  // Réinitialiser le champ de texte
        }
    };

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.contentContainer}>
                <div className={styles.contactsContainer}>
                    {contacts}
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
            </div>
            <Footer />
        </div>
    );
}

export default Messaging;

