import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';

import type { ICourseResource } from '../../interfaces/ICourseData';

type ResourceCardProps = {
  resource: ICourseResource;
};

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  return (
    <IonCard className="material-card">
      <IonCardHeader>
        <IonCardTitle>{resource.title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>{resource.description}</p>
        {resource.link ? (
          <IonButton fill="outline" href={resource.link}>
            View Resource
          </IonButton>
        ) : null}
      </IonCardContent>
    </IonCard>
  );
};

export default ResourceCard;
