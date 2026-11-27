import { IonCard, IonContent, IonDatetime, IonPage, IonTitle } from '@ionic/react';
import './Calendar.css';
import '../theme/page.css';
import randomMC from 'random-material-color';
import { useRef, useState } from 'react';

import AppBar from '../components/AppBar';
import CalItemCard from '../components/calendar/CalItemCard';
import { CALITEMS, UNI_NAME } from '../constants';


const Calendar: React.FC = () => {
  const [active, setActive] = useState<string>("");

  const calRef = useRef<HTMLIonDatetimeElement>(null);
  const calItemsSorted = CALITEMS.sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <IonPage>
      <AppBar uniName={UNI_NAME} tab="Calendar" />
      <IonContent fullscreen>
        <div id="content" className="calendar">
          <IonCard id="side-card">
            <IonTitle className="ion-padding-top">Upcoming</IonTitle>
            {calItemsSorted.filter(e => e.date > new Date()).map((q, i) => {
              return (
                <CalItemCard
                  key={i}
                  itemName={q.name}
                  sent={q.date}
                  onClick={(_itemName: string): void => {
                    calRef.current!.value = q.date.toISOString().split("T")[0];
                    setActive(_active => q.date.toISOString().split("T")[0]);
                  }}
                  details={q.details}
                  tags={q.tags}
                  from={q.from ?? ''}
                  className={q.date.toISOString().split("T")[0] === active ? "active" : ""}
                />
              );
            })}
            <IonTitle>Done</IonTitle>
            {calItemsSorted.filter(e => e.date < new Date()).map((q, i) => {
              return (
                <CalItemCard
                  key={i}
                  itemName={q.name}
                  sent={q.date}
                  onClick={(_itemName: string): void => {
                    calRef.current!.value = q.date.toISOString().split("T")[0];
                    setActive(_active => q.date.toISOString().split("T")[0]);
                  }}
                  details={q.details}
                  tags={q.tags}
                  from={q.from ?? ''}
                  className={"done " + (q.date.toISOString().split("T")[0] === active ? "active" : "")}
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
              onIonChange={() => {
                setActive(_active => {
                  return calRef.current!.value as string; // dang right you get cast
                });
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
