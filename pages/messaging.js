import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../styles/Messaging.module"

function Messaging() {
    return(
        <div className={styles.container}>
            <Header />
            <Footer />
        </div>
    )

};

export default Messaging;