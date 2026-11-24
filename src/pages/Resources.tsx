import { IonCard, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Resources.css';
import '../theme/page.css'
import AppBar from '../components/AppBar';
import { UNI_NAME } from '../constants';
import PlaceholderCard from '../components/PlaceholderCard';

const Resources: React.FC = () => {
  return (
    <IonPage>
      <AppBar uniName={UNI_NAME} tab="Resources" />
      <IonContent fullscreen>
        <div id="content">
          <IonCard>
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
          </IonCard>
          <IonCard id="side-card">
            <PlaceholderCard />
            <PlaceholderCard />
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Resources;
