import { IonAvatar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonRippleEffect } from '@ionic/react';

import './ChatUserCard.css';
import { toShortTimeString } from '../../util';

type ChatUserCardProps = {
  chatName: string;
  lastChat: string;
  sent: Date;
  isActive: boolean;
  onClick: (chatName: string) => void;
};

const ChatUserCard: React.FC<ChatUserCardProps>
  = ({ chatName, lastChat, sent, isActive, onClick }: ChatUserCardProps) => {
  const truncLength: number = 12;
  const lcTruncated: string = lastChat.substring(0, truncLength) + (lastChat.length > truncLength ? '...' : '');
  return (
    <IonCard className={"chat-card ion-activatable" + (isActive ? " active" : "")} onClick={() => onClick(chatName)}>
      <IonRippleEffect></IonRippleEffect>
      <IonAvatar>
        <img src={"https://api.dicebear.com/10.x/pixelbot/svg?tags=animation&rotate=-15&scale=0.7&seed=" + encodeURIComponent(chatName)} />
      </IonAvatar>
      <IonCardHeader>
        <IonCardTitle>{chatName}</IonCardTitle>
        <IonCardSubtitle>{lcTruncated + ' • ' + toShortTimeString(sent)}</IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  );
};

export default ChatUserCard;
