import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { calendar, chatbubbles, briefcase, home, person, school } from 'ionicons/icons';
import { Navigate, Route } from 'react-router-dom';

import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import './main.css';
import Resources from './pages/Resources';
import Chats from './pages/Chats';
import Calendar from './pages/Calendar';

setupIonicReact({
  mode: 'md',
});

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonTabBar slot="bottom" id="tab-bar">
          <IonTabButton tab="home-logo" href="/">
            <IonIcon aria-hidden="true" icon={school} />
          </IonTabButton>
          <IonTabButton tab="spacer" disabled={true} href="/">
          </IonTabButton>
          <IonTabButton tab="home" href="/home">
            <IonIcon aria-hidden="true" icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="calendar" href="/calendar">
            <IonIcon aria-hidden="true" icon={calendar} />
            <IonLabel>Calendar</IonLabel>
          </IonTabButton>
          <IonTabButton tab="chats" href="/chats">
            <IonIcon aria-hidden="true" icon={chatbubbles} />
            <IonLabel>Chats</IonLabel>
          </IonTabButton>
          <IonTabButton tab="resources" href="/resources">
            <IonIcon aria-hidden="true" icon={briefcase} />
            <IonLabel>Resources</IonLabel>
          </IonTabButton>
          <IonTabButton tab="spacer" disabled={true} href="/">
          </IonTabButton>
          <IonTabButton tab="account" href="/home">
            <IonIcon aria-hidden="true" icon={person} />
            <IonLabel>Account</IonLabel>
          </IonTabButton>
        </IonTabBar>
        <IonRouterOutlet>
          <Route path="/home" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </IonRouterOutlet>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
