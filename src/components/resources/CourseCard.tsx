import { IonCard, IonRippleEffect, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/react";
import randomMC from "random-material-color";
import { useEffect, useRef } from "react";

import './CourseCard.css';
import type { ICourseData } from "../../interfaces/ICourseData";

type CourseCardProps = {
  courseInfo: ICourseData;
  onClick: (course: ICourseData) => void;
  active: boolean;
};

const CourseCard: React.FC<CourseCardProps> = ({ courseInfo, onClick, active}) => {
  const colorLabel = useRef<HTMLDivElement>(null);
  const calColor = randomMC.getColor({ text: courseInfo.name });
  useEffect(() => {
    colorLabel.current?.style.setProperty('background', calColor);
  }, [calColor, colorLabel]);
  return (
    <IonCard className={'course-card ion-activatable ' + (active ? "active" : "")} onClick={() => onClick(courseInfo)}>
      <IonRippleEffect></IonRippleEffect>
      <div className="cal-color" ref={colorLabel}></div>
      <div>
        <IonCardHeader>
          <IonCardTitle>{courseInfo.name}</IonCardTitle>
          <IonCardSubtitle>{courseInfo.prof.profName}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent className="cal-content">
          <p>{courseInfo.description}</p>
        </IonCardContent>
      </div>
    </IonCard>
  );
};

export default CourseCard;
