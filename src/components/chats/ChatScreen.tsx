import {
  IonButton,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonInput,
  useIonViewWillEnter,
} from '@ionic/react';
import './ChatScreen.css';
import { arrowBack, send } from 'ionicons/icons';

import type { IChat } from '../../interfaces/IChat';
import { toShortTimeString } from '../../util';
import { useEffect, useRef, useState } from 'react';
import { _addChat } from '../../constants';

type ChatScreenProps = {
  chatName: string;
  chats: IChat[];
  back: () => void;
};
type ChatBubbleProps = {
  chatText: string;
  isSender: boolean;
  sent: Date;
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ chatText, isSender, sent }: ChatBubbleProps) => {
  return (
    <div className={'chat-bubble' + (isSender ? ' sender' : '')}>
      <div className="chat-content">{chatText}</div>
      <div className="chat-sent">{toShortTimeString(sent)}</div>
    </div>
  );
};

const ChatScreen: React.FC<ChatScreenProps> = ({ chatName, chats, back }: ChatScreenProps) => {
  const [currentChat, setCurrentChat] = useState<boolean>(false);
  const sortedChats: IChat[] = chats?.sort((a, b) => {
    return a.sent.getTime() - b.sent.getTime();
  });
  const inputRef = useRef<HTMLIonInputElement | null>(null);
  const botRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    botRef.current?.scrollIntoView();
  }, [chats, currentChat]);
  const submitChat = (): void => {
    inputRef.current?.getInputElement().then((e) => {
      if (!e.value.trim()) return;
      _addChat(e.value, chatName);
      setCurrentChat((_currentChat: boolean) => !_currentChat);
      e.value = '';
    });
  };
  return (
    <div className="chat-screen">
      {sortedChats == null ? null : (
        <IonCardHeader>
          <IonButton onClick={back} shape="round" fill="clear" color="dark">
            <IonIcon icon={arrowBack} slot="icon-only" />
          </IonButton>
          <IonCardTitle>{chatName}</IonCardTitle>
        </IonCardHeader>
      )}
      <IonCardContent className="chat-scroll">
        {sortedChats?.map((q, i) => {
          return <ChatBubble key={i} chatText={q.chatText} isSender={q.isSender} sent={q.sent} />;
        })}
        <div ref={botRef}></div>
        {sortedChats == null ? (
          <strong>Click on a chat to continue.</strong>
        ) : (
          <div className="chat-input">
              <IonInput onKeyUp={(e) => {
                if (e.key === "Enter") submitChat();
              }} placeholder="Aa" ref={inputRef} />
            <IonButton size="small" shape="round" onClick={submitChat}>
              <IonIcon icon={send} slot="icon-only" />
            </IonButton>
          </div>
        )}
      </IonCardContent>
    </div>
  );
};

export default ChatScreen;
