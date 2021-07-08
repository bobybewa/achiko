import { IonButton, IonContent, IonPage } from '@ionic/react';
import React, { useEffect } from 'react';
import CardProfile from '../../components/profileCard/card'
const Profile: React.FC = () => {
    return (
        <IonPage>
            <IonContent>
                <CardProfile/>
            </IonContent>
        </IonPage>
    );
};

export default Profile;