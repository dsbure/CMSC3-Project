import { IonToolbar, IonTitle, IonHeader } from '@ionic/react';
import './AppBar.css';

interface BarProps {
    uniName: string;
    tab: string;
}

const AppBar: React.FC<BarProps> = ({ uniName, tab }) => {
    return (
        <IonHeader>
            <IonToolbar>
                <div id="title-bar">
                    <IonTitle size="large">{uniName}</IonTitle>
                    <IonTitle id="name">SoCollegeMed</IonTitle>
                </div>
                <IonTitle size="small">{tab}</IonTitle>
            </IonToolbar>
        </IonHeader>
    );
};

export default AppBar;