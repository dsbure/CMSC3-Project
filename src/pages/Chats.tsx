import { IonCard, IonCardHeader, IonCardTitle, IonContent, IonPage, IonSearchbar } from '@ionic/react';
import './Chats.css';
import '../theme/page.css';
import Fuse from 'fuse.js';
import { useEffect, useState } from 'react';

import AppBar from '../components/AppBar';
import ChatScreen from '../components/chats/ChatScreen';
import ChatUserCard from '../components/chats/ChatUserCard';
import { UNI_NAME, CHATS, _onAddChat } from '../constants';
import type { IChatData } from '../interfaces/IChat';
import { getLastChat } from '../util';

const Chats: React.FC = () => {
  const [_currentChat, setCurrentChat] = useState<number>(0);
  const [currentName, setCurrentName] = useState<string>('');
  const [currentSearch, setCurrentSearch] = useState<string>('');
  const [visChats, setVisChats] = useState<IChatData>(CHATS);
  useEffect(() => {
    const unsub = _onAddChat(() => {
      setCurrentChat((currentChat) => currentChat + 1);
    });
    return () => unsub();
  }, []);
  useEffect(() => {
    if (currentSearch.trim() === '') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisChats(CHATS);
    }
    const fuse = new Fuse(Object.entries(CHATS).map((e) => e[0]), {includeScore: true});
    const searchItems = fuse.search(currentSearch);
    setVisChats(() => {
      return Object.fromEntries(
        Object.entries(CHATS).filter((e) => {
          let isInSearch = false;
          searchItems.every((s) => {
            if (s.item === e[0]) {
              isInSearch = true;
              return false;
            }
            return true;
          });
          return isInSearch;
        }).sort((a, b) => {
          let aScore = 0.00;
          let bScore = 0.00;
          searchItems.every((s) => {
            if (aScore !== 0 && bScore !== 0) return false;
            if (a[0] === s.item && s.score) aScore = s.score;
            if (b[0] === s.item && s.score) bScore = s.score;
            return true;
          });
          // console.log("=====");
          // console.log(aScore, a);
          // console.log(bScore, b);
          return aScore - bScore;
        }),
      );
    });
  }, [currentSearch]);
  return (
    <IonPage>
      <AppBar uniName={UNI_NAME} tab="Chats" />
      <IonContent fullscreen>
        <div id="content" className="chats">
          <IonCard id="side-card">
            <IonCardHeader id="chat-header">
              <IonCardTitle>Chats</IonCardTitle>
              <IonSearchbar
                id="chat-search"
                onIonInput={(e) => {
                  setCurrentSearch((_currentSearch) => e.target?.value ?? '');
                }}
              />
            </IonCardHeader>
            {Object.entries(visChats)
              .sort((a, b) => {
                if (currentSearch !== '') {
                  return 0;
                }
                return getLastChat(b[1]).sent.getTime() - getLastChat(a[1]).sent.getTime();
              })
              .map((q, i) => {
                return (
                  <ChatUserCard
                    key={i}
                    chatName={q[0]}
                    lastChat={getLastChat(q[1]).chatText}
                    sent={getLastChat(q[1]).sent}
                    onClick={setCurrentName}
                    isActive={currentName == q[0]}
                  />
                );
              })}
          </IonCard>
          <IonCard id="chat-area" className={currentName ? 'active' : ''}>
            <ChatScreen chatName={currentName} chats={CHATS[currentName]} back={() => setCurrentName('')} />
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Chats;
