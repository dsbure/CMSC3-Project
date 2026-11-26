import { IonCard, IonContent, IonDatetime, IonPage } from '@ionic/react';

import './Calendar.css';
import '../theme/page.css';
import AppBar from '../components/AppBar';
import CalItemCard from '../components/calendar/CalItemCard';
import { UNI_NAME } from '../constants';

const Calendar: React.FC = () => {
  return (
    <IonPage>
      <AppBar uniName={UNI_NAME} tab="Calendar" />
      <IonContent fullscreen>
        <div id="content" className="calendar">
          <IonCard id="side-card">
            <CalItemCard
              itemName={'End of Beginning'}
              sent={new Date(2026, 11, 26, 9, 30)}
              onClick={(_itemName: string): void => {
              }}
            />
            <CalItemCard
              itemName={'Graduate ka na kol'}
              sent={new Date()}
              onClick={(_itemName: string): void => {
              }}
            />
            <CalItemCard
              itemName={'End of the World (DOST Stipend)'}
              sent={new Date(2026, 10, 13, 18, 30)}
              onClick={(_itemName: string): void => {
              }}
            />
            <CalItemCard
              itemName={'Beginning of End'}
              sent={new Date(2020, 3, 2, 8, 30)}
              onClick={(_itemName: string): void => {
              }}
            />
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
