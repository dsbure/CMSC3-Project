import { IonCard, IonContent, IonDatetime, IonPage } from '@ionic/react';
import './Calendar.css';
import '../theme/page.css';
import randomMC from 'random-material-color';
import { useRef } from 'react';

import AppBar from '../components/AppBar';
import CalItemCard from '../components/calendar/CalItemCard';
import { CALITEMS, UNI_NAME } from '../constants';


const Calendar: React.FC = () => {
  const calRef = useRef<HTMLIonDatetimeElement>(null);
  return (
    <IonPage>
      <AppBar uniName={UNI_NAME} tab="Calendar" />
      <IonContent fullscreen>
        <div id="content" className="calendar">
          <IonCard id="side-card">
            {CALITEMS.sort((a, b) => b.date.getTime() - a.date.getTime()).map((q, i) => {
              return (
                <CalItemCard
                  key={i}
                  itemName={q.name}
                  sent={q.date}
                  onClick={(_itemName: string): void => {
                    calRef.current!.value = q.date.toISOString().split("T")[0];
                  }}
                  details={q.details}
                  tags={q.tags}
                  from={q.from ?? ''}
                  className={new Date().getTime() > q.date.getTime() ? "done" : ""}
                />
              );
            })}
          </IonCard>
          <IonCard id="calendar-container">
            <IonDatetime
              ref={calRef}
              presentation="date"
              showAdjacentDays={true}
              showDefaultTitle={true}
              highlightedDates={(isoDate) => {
                let highlightObj = undefined;
                CALITEMS.forEach((q) => {
                  if (q.date.toISOString().split('T')[0] === isoDate) {
                    highlightObj = {
                      backgroundColor:
                        'color-mix(in srgb, transparent 50%, ' +
                        randomMC.getColor({ text: !q.from ? q.name : q.from }) +
                        ')',
                      textColor:
                        'color-mix(in srgb, var(--ion-text-color) 80%, ' +
                        randomMC.getColor({ text: !q.from ? q.name : q.from }) +
                        ')',
                    };
                  }
                });
                return highlightObj;
              }}
            >
              <span slot="title">{new Date().toLocaleDateString()}</span>
            </IonDatetime>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Calendar;
