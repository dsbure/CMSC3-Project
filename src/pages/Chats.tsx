import { IonCard, IonCardHeader, IonCardTitle, IonContent, IonPage } from '@ionic/react';
import './Chats.css';
import '../theme/page.css';
import { useEffect, useState } from 'react';

import AppBar from '../components/AppBar';
import ChatScreen from '../components/chats/ChatScreen';
import ChatUserCard from '../components/chats/ChatUserCard';
import { UNI_NAME, CHATS, _onAddChat } from '../constants';
import type { IChat } from '../interfaces/IChat';

function getLastChat (chats: IChat[]): IChat {
  return chats.sort((a: IChat, b: IChat) => {
    return a.sent.getTime() - b.sent.getTime();
  })[chats.length - 1];
}

const Chats: React.FC = () => {
  const [currentName, setCurrentName] = useState<string>("");
  return (
    <IonPage>
      <AppBar uniName={UNI_NAME} tab="Chats" />
      <IonContent fullscreen>
        <div id="content" className="chats">
          <IonCard id="side-card" >
            <IonCardHeader id="chat-header">
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
                  onClick={setCurrentName}
                  isActive={currentName == q[0]} />
              })
            }
          </IonCard>
          <IonCard id="chat-area" className={currentName ? "active" : ""}>
            <ChatScreen
              chatName={currentName}
              chats={CHATS[currentName]}
              back={() => setCurrentName("")}
            />
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Chats;
