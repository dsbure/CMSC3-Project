import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonRippleEffect } from '@ionic/react';
import './CalItemCard.css';
import { calendar } from 'ionicons/icons';

import { toShortTimeString } from '../../util';

type CalItemCardProps = {
  itemName: string;
  sent: Date;
  onClick: (itemName: string) => void;
};

const CalItemCard: React.FC<CalItemCardProps>
  = ({ itemName, sent, onClick }: CalItemCardProps) => {
  return (
    <IonCard className="cal-card ion-activatable" onClick={() => onClick(itemName)}>
      <IonRippleEffect></IonRippleEffect>
      <IonIcon icon={calendar} />
      <IonCardHeader>
        <IonCardTitle>{itemName}</IonCardTitle>
        <IonCardSubtitle>{'At ' + toShortTimeString(sent)}</IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  );
};

export default CalItemCard;
