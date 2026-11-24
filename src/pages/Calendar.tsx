import { IonCard, IonContent, IonDatetime, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Calendar.css';
import '../theme/page.css';
import AppBar from '../components/AppBar';
import { UNI_NAME } from '../constants';
import PlaceholderCard from '../components/PlaceholderCard';

const Calendar: React.FC = () => {
  return (
    <IonPage>
      <AppBar uniName={UNI_NAME} tab="Calendar" />
      <IonContent fullscreen>
        <div id="content" className="calendar">
          <IonCard id="side-card">
            <PlaceholderCard />
            <PlaceholderCard />
          </IonCard>
          <IonCard id="calendar-container">
            <IonDatetime></IonDatetime>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Calendar;
