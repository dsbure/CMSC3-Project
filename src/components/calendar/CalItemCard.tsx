import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonRippleEffect,
} from '@ionic/react';
import './CalItemCard.css';
import randomMC from 'random-material-color';
import { useEffect, useRef } from 'react';

import { toShortTimeString } from '../../util';

type CalItemCardProps = {
  itemName: string;
  details: string;
  tags: string[];
  from: string;
  sent: Date;
  onClick: (itemName: string) => void;
  className: string;
};

const CalItemCard: React.FC<CalItemCardProps> = ({
  itemName,
  details,
  tags,
  from,
  sent,
  onClick,
  className,
}: CalItemCardProps) => {
  const colorLabel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    colorLabel!.current!.style.setProperty("background", randomMC.getColor({ text: (!from ? itemName : from) }));
  }, [colorLabel, from, itemName]);
  return (
    <IonCard className={"cal-card ion-activatable " + className} onClick={() => onClick(itemName)}>
      <IonRippleEffect></IonRippleEffect>
      <div className="cal-color" ref={colorLabel}></div>
      <div>
        <IonCardHeader>
          <IonCardTitle>{itemName}</IonCardTitle>
          <IonCardSubtitle>{'At ' + toShortTimeString(sent)}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent className="cal-content">
          <p>{details}</p>
          {from !== '' ? <IonChip color="primary">{from}</IonChip> : null}
          <div className="tag-container">
            {tags?.map((q, i) => {
              return <IonChip key={i}>{q}</IonChip>;
            })}
          </div>
        </IonCardContent>
      </div>
    </IonCard>
  );
};

export default CalItemCard;
