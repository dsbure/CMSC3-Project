import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

import { toShortTimeString } from '../../util';

type ChatUserCardProps = {
  chatName: string;
  lastChat: string;
  sent: Date;
};

const ChatUserCard: React.FC<ChatUserCardProps> = ({ chatName, lastChat, sent }: ChatUserCardProps) => {
  const truncLength: number = 16;
  const lcTruncated: string = lastChat.substring(0, truncLength)
    + (lastChat.length > truncLength ? "..." : "" );
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{chatName}</IonCardTitle>
        <IonCardSubtitle>{lcTruncated + " • " + toShortTimeString(sent)}</IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  );
};

export default ChatUserCard;
