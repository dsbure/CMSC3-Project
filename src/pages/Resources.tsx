import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonContent,
  IonIcon,
  IonLabel,
  IonPage,
  IonTitle,
} from '@ionic/react';
import './Resources.css';
import '../theme/page.css';
import { arrowBack, calendar, chatbox, star } from 'ionicons/icons';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import AppBar from '../components/AppBar';
import CourseCard from '../components/resources/CourseCard';
import MaterialCard from '../components/resources/MaterialCard';
import { COURSES, UNI_NAME } from '../constants';
import type { ICourseData } from '../interfaces/ICourseData';

const Resources: React.FC = () => {
  const [activeCourse, setActiveCourse] = useState<ICourseData | null>(null);
  const [params, setParams] = useSearchParams();
  const setCurrentActiveCourse = (course: ICourseData | null): void => {
    setParams(course ? { subject: course.name } : undefined);
  };
  const paramsCourse = params.get("subject");
  if (paramsCourse) {
    let course: ICourseData | null = null;
    COURSES.every((e) => {
      if (e.name === paramsCourse) {
        course = e;
        return false;
      }
      return true;
    })
    if (course && course !== activeCourse) {
      setActiveCourse(course);
    }
  } else if (!paramsCourse && activeCourse !== null) {
    setActiveCourse(null);
  }
  return (
    <IonPage>
      <AppBar uniName={UNI_NAME} tab="Resources" />
      <IonContent fullscreen>
        <div id="content" className="resources">
          <IonCard id="side-card">
            <IonTitle className="ion-padding-top">Courses</IonTitle>
            {COURSES.map((q, i) => {
              return (
                <CourseCard
                  key={i}
                  courseInfo={q}
                  onClick={(course: ICourseData) => {
                    setCurrentActiveCourse(course);
                  }}
                  active={activeCourse === q}
                />
              );
            })}
          </IonCard>
          <IonCard id="course-screen" className={activeCourse !== null ? 'active' : ''}>
            {activeCourse !== null ? (
              <>
                <IonCard>
                  <IonCardHeader>
                    <IonButton
                      onClick={() => setCurrentActiveCourse(null)}
                      shape="round"
                      fill="clear"
                      color="dark"
                    >
                      <IonIcon icon={arrowBack} slot="icon-only" />
                    </IonButton>
                    <IonCardTitle>{activeCourse.name}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>{activeCourse.description}</p>
                    <div className="prof-card ion-padding">
                      <h2>{activeCourse.prof.profName}</h2>
                      {activeCourse.prof.description ? <p>{activeCourse.prof.description}</p> : null}
                      <div className="pc-footer">
                        <IonChip className="rating-chip" color="warning">
                          <IonIcon icon={star} />
                          <IonLabel>{activeCourse.prof.rating.toFixed(2)}</IonLabel>
                        </IonChip>
                        <IonChip
                          className="comments-chip"
                          onClick={() => {
                            // TODO: fix
                            alert(activeCourse.prof.reviews.concat('\n'));
                          }}
                        >
                          <IonIcon icon={chatbox} />
                          <IonLabel>{activeCourse.prof.reviews.length}</IonLabel>
                        </IonChip>
                        <IonChip className="sched-chip">
                          <IonIcon icon={calendar} />
                          <IonLabel>{activeCourse.prof.schedule}</IonLabel>
                        </IonChip>
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Course Materials</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    {
                      activeCourse.resources.length !== 0 ?
                        activeCourse.resources.map((q, i) => {
                          return <MaterialCard key={i} resource={q} />
                        })
                      : <h2>No Materials</h2>
                    }
                  </IonCardContent>
                </IonCard>
              </>
            ) : (
              <h1 className="ion-padding">Select a course to continue</h1>
            )}
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Resources;
