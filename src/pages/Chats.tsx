import { IonCard, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Chats.css';
import '../theme/page.css';
import AppBar from '../components/AppBar';
import { UNI_NAME } from '../constants';
import PlaceholderCard from '../components/PlaceholderCard';

const Chats: React.FC = () => {
  return (
    <IonPage>
      <AppBar uniName={UNI_NAME} tab="Chats" />
      <IonContent fullscreen>
        <div id="content" className="chats">
          <IonCard id="side-card">
            <IonCardHeader>
              <IonCardTitle>Chats</IonCardTitle>
            </IonCardHeader>
            <PlaceholderCard showDeets={false} />
            <PlaceholderCard showDeets={false} />
            <PlaceholderCard showDeets={false} />
            <PlaceholderCard showDeets={false} />
            <PlaceholderCard showDeets={false} />
            <PlaceholderCard showDeets={false} />
            <PlaceholderCard showDeets={false} />
            <PlaceholderCard showDeets={false} />
          </IonCard>
          <IonCard id="chat-area">
            <PlaceholderCard />
            <PlaceholderCard />
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Chats;
