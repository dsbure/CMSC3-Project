import { IonToolbar, IonTitle, IonHeader } from '@ionic/react';

import './AppBar.css';
import { UNI_LOGO } from '../constants';

interface BarProps {
  uniName: string;
  tab: string;
}

const AppBar: React.FC<BarProps> = ({ uniName, tab }) => {
  return (
    <IonHeader>
      <IonToolbar>
        <img src={UNI_LOGO} alt={uniName} className="uni-logo"/>
        <div id="title-bar">
          <IonTitle size="large">{uniName}</IonTitle>
          <IonTitle size="small">{tab}</IonTitle>
        </div>
        <IonTitle id="name">SoCollegeMed</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default AppBar;
