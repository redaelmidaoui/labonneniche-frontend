import { useEffect, useState, useRef } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../styles/Messaging.module.css";
import Contact from "../components/Contact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function Messaging() {
    const [contactList, setContactList] = useState([]);
    const [messageList, setMessageList] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [selectedContactId, setSelectedContactId] = useState(null);

    const user = useSelector((state) => state.user);
    const router = useRouter();
    const { id } = router.query;

    // Création d'une référence pour le conteneur des messages
    const messagesEndRef = useRef(null);

    useEffect(() => {
        fetch(`http://localhost:3000/messaging/getMessaging/${user._id}`)
            .then(response => response.json())
            .then(data => {
                setContactList(data.messageries);

                // Si un ID est passé dans l'URL, sélectionner directement la conversation
                if (id) {
                    const findMessaging = data.messageries.find(item => item._id === id);
                    if (findMessaging) {
                        setMessageList(findMessaging.messages);
                        setSelectedContactId(id); // Mettre à jour le contact sélectionné
                    }
                }
            })
            .catch(error => console.error("Error fetching messages:", error));
    }, [id, user._id]);


    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messageList]);
    

    const contactClickHandler = (id_messaging) => {
        setSelectedContactId(id_messaging);
        const findMessaging = contactList.find(item => item._id === id_messaging);

        if (findMessaging) {
            setMessageList(findMessaging.messages);
        }
    }

    const contacts = contactList.map((data, key) => {
        const isSelected = selectedContactId === data._id;
        const lastMessage = data.messages[data.messages.length - 1];
        let lastMessageDate = "";
        if (data.messages.length !== 0 && lastMessage.date_of_dispatch) {

            const date_last_message = new Date(lastMessage.date_of_dispatch);
    
            if (!isNaN(date_last_message.getTime())) {
                const day = String(date_last_message.getDate()).padStart(2, '0');
                const month = String(date_last_message.getMonth() + 1).padStart(2, '0');
                const year = date_last_message.getFullYear();
                lastMessageDate = `Last message: ${day}/${month}/${year}`;
            } else {
                lastMessageDate = "Invalid date";
            }
        }
        return (
            <Contact 
                id={data._id} 
                key={key} 
                contact={data.user1._id !== user._id ? data.user1 : data.user2}
                onClick={() => contactClickHandler(data._id)}
                isSelected={isSelected}
                lastMessageDate={lastMessageDate}
            />
        );
    });

    const messages = (messageList || []).map((data, key) => (
        <div 
            className={styles.message} 
            key={key} 
            style={{ flexDirection: user._id === data.id_editor ? "row-reverse" : "row" }}
        >
            <p>{data.content}</p>
        </div>
    ));
    

    const sendHandler = () => {
        if (!messageText.trim()) {
            alert("Veuillez écrire un message avant d'envoyer.");
            return;
        }

        if (selectedContactId) {
            const newMessage = { id_editor: user._id, content: messageText };
    
            fetch(`http://localhost:3000/messaging/addMessage/${selectedContactId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMessage)
            })
            .then(response => {
                if (!response.ok) throw new Error("Erreur lors de l'envoi du message");
                return response.json();
            })
            .then(() => {
                
                const updatedContactList = contactList.map(contact => {
                    if (contact._id === selectedContactId) {
                        return {
                            ...contact,
                            messages: [...contact.messages, newMessage]
                        };
                    }
                    return contact;
                });
                setContactList(updatedContactList);

                setMessageList(prevMessages => [...prevMessages, newMessage]);
                setMessageText("");
            })
            .catch(error => {
                console.error("Erreur lors de l'envoi du message :", error);
                alert("Un problème est survenu. Veuillez réessayer plus tard.");
            });
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
                            placeholder="Tapez votre message..."
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

