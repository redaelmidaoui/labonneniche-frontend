import { useState } from 'react';
import styles from '../styles/Account.module.css';

function UploadPhoto({ onUpload }) {
    const [preview, setPreview] = useState(null);

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            previewFile(file);
            uploadToCloudinary(file);
        }
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const uploadToCloudinary = (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ml_default");

        fetch('https://api.cloudinary.com/v1_1/934184952281418/image/upload', {
            method: 'POST',
            body: formData,
        })
        .then(res => res.json())
        .then(data => {
            console.log('Uploaded to Cloudinary:', data.secure_url);
            onUpload(data.secure_url); // On prévient la page que l'upload qu'on lui fourni grâce à ce component est sans risque
        })
        .catch(err => console.error("Upload error:", err));
    };

    return (
        <div className={styles.profilePhoto}
             onDragOver={(e) => e.preventDefault()}
             onDrop={handleDrop}
        >
            {preview ? (
                <img src={preview} alt="Aperçu" className={styles.profilePreview} />
            ) : (
                <>
                    <p className={styles.mention}>Glissez-déposez votre photo<br></br>ou cliquez pour choisir</p>
                </>
            )}
        </div>
    );
}

export default UploadPhoto;