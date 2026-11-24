import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Home.css';
import '../theme/page.css';
import AppBar from '../components/AppBar';
import { UNI_NAME } from '../constants';
import PlaceholderCard from '../components/PlaceholderCard';

const Home: React.FC = () => {
  return (
    <IonPage>
      <AppBar uniName={UNI_NAME} tab="Home" />
      <IonContent fullscreen>
        <div id="content">
          <IonCard>
            <PlaceholderCard />
            <PlaceholderCard />
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
export default Home;
