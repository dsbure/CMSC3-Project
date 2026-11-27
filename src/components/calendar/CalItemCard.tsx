import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonIcon,
  IonRippleEffect,
  useIonRouter,
} from '@ionic/react';
import './CalItemCard.css';
import { arrowForward } from 'ionicons/icons';
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
  const router = useIonRouter();
  const calRef = useRef<HTMLIonCardElement>(null);
  const subjectChip = useRef<HTMLIonChipElement>(null);
  const colorLabel = useRef<HTMLDivElement>(null);
  const calColor = randomMC.getColor({ text: !from ? itemName : from });
  useEffect(() => {
    subjectChip.current?.style.setProperty('--background', 'color-mix(in srgb, transparent 50%, ' + calColor + ')');
    colorLabel.current?.style.setProperty('background', calColor);
  }, [calColor, colorLabel, from, itemName]);
  useEffect(() => {
    if (className === "active") {
      calRef?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [className]);
  return (
    <IonCard ref={calRef} className={'cal-card ion-activatable ' + className} onClick={() => onClick(itemName)}>
      <IonRippleEffect></IonRippleEffect>
      <div className="cal-color" ref={colorLabel}></div>
      <div>
        <IonCardHeader>
          <IonCardTitle>{itemName}</IonCardTitle>
          <IonCardSubtitle>{'At ' + toShortTimeString(sent)}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent className="cal-content">
          <p>{details}</p>
          {from !== '' ? (
            <div className="subject-line">
              <IonChip
                ref={subjectChip}
                onClick={(e): void => {
                  e.stopPropagation();
                  router.push('/resources?subject=' + encodeURIComponent(from), 'forward');
                }}
              >
                {from}
              </IonChip>
              <IonButton
                shape="round"
                fill="clear"
                color="medium"
                onClick={(e): void => {
                  e.stopPropagation();
                  router.push('/resources?subject=' + encodeURIComponent(from), 'forward');
                }}
              >
                <IonIcon slot="icon-only" icon={arrowForward} />
              </IonButton>
            </div>
          ) : null}
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
