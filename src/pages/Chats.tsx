import { IonCard, IonCardHeader, IonCardTitle, IonContent, IonItemDivider, IonPage } from '@ionic/react';

import './Chats.css';
import '../theme/page.css';
import AppBar from '../components/AppBar';
import PlaceholderCard from '../components/PlaceholderCard';
import ChatUserCard from '../components/chats/ChatUserCard';
import { UNI_NAME, CHATS } from '../constants';
import type { IChat, IChatData } from '../interfaces/IChat';

function getLastChat (chats: IChat[]): IChat {
  return chats.sort((a: IChat, b: IChat) => {
    return a.sent.getTime() - b.sent.getTime();
  })[chats.length - 1];
}

const Chats: React.FC = () => {

  return (
    <IonPage>
      <AppBar uniName={UNI_NAME} tab="Chats" />
      <IonContent fullscreen>
        <div id="content" className="chats">
          <IonCard id="side-card">
            <IonCardHeader>
              <IonCardTitle>Chats</IonCardTitle>
            </IonCardHeader>
            {
              Object.entries(CHATS).sort((a, b) => {
                return getLastChat(b[1]).sent.getTime()
                  - getLastChat(a[1]).sent.getTime();
              }).map((q, i) => {
                return <ChatUserCard
                  key={i}
                  chatName={q[0]}
                  lastChat={getLastChat(q[1]).chatText}
                  sent={getLastChat(q[1]).sent}
                />
              })
            }
          </IonCard>
          <IonCard id="chat-area">
            <PlaceholderCard />
            <PlaceholderCard />
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Chats;
