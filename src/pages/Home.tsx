import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonPage,
} from '@ionic/react';
import './Home.css';
import '../theme/page.css';
import { add, arrowForward, chatboxEllipsesOutline, heartOutline, shareSocial } from 'ionicons/icons';

import AppBar from '../components/AppBar';
import PlaceholderCard from '../components/PlaceholderCard';
import ChatUserCard from '../components/chats/ChatUserCard';
import { CHATS, UNI_NAME } from '../constants';
import { getLastChat, toShortTimeString } from '../util';

type PostCardProps = {
  sender: string;
  // TODO: add mediaaaaaargh
  postContent: string;
  created: Date;

  likes: number;
  comments: number; // arraych
};

const PostCard: React.FC<PostCardProps> = ({ sender, postContent, created, likes, comments }: PostCardProps) => {
  return (
    <div className="postcard">
      <div className="post-content">{postContent}</div>
      <div className="post-footer">
        <div className="post-info">
          <p>{'from ' + sender}</p>
          <p>{toShortTimeString(created)}</p>
        </div>
        <div className="post-actions">
          <IonButton size="small" fill="outline" className="post-likes">
            <IonIcon icon={heartOutline} slot="start" />
            {likes}
          </IonButton>
          <IonButton size="small" fill="outline" className="post-comment">
            <IonIcon icon={chatboxEllipsesOutline} slot="start" />
            {comments}
          </IonButton>
          <IonButton size="small" fill="outline" className="post-share">
            <IonIcon icon={shareSocial} slot="start" />
            SHare
          </IonButton>
        </div>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <IonPage>
      <AppBar uniName={UNI_NAME} tab="Home" />
      <IonContent fullscreen>
        <div id="content" className="home">
          <IonCard>
            <IonCard id="announcements-card">
              <IonCardHeader>
                <IonCardTitle>Latest Announcements</IonCardTitle>
                <IonCardSubtitle>
                  {'From ' + UNI_NAME + ' | ' + toShortTimeString(new Date(2026, 7, 7))}
                </IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent id="latest-announcements">
                <p>
                  I can't lie, it feels nice that you're calling You sound sad and alone, and you're stalling And for
                  once, I don't care about what you want As long as we keep talking (As long as we're talking) I mean,
                  you gotta admit the history's kind of unmatched Asian Calvinism, we made it out of that Well, whether
                  we're free of will or predestined Clearly, I've not learned my lesson even now Hope He doesn't strike
                  me down (Strike me down)
                </p>
                <IonButton id="view-announcements">
                  <IonIcon slot="end" icon={arrowForward} />
                  View Announcements
                </IonButton>
              </IonCardContent>
            </IonCard>
            <IonCard id="feed-card">
              <IonCardHeader>
                <IonCardTitle>Campus Discussions</IonCardTitle>
              </IonCardHeader>
              <IonCardContent id="post-feed">
                <IonButton id="create-post">
                  <IonIcon slot="end" icon={add} />
                  Create Post
                </IonButton>
                <PostCard
                  sender="Dee Makausad"
                  postContent="This is a post. Hello World. Lorem Ipsum. Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah"
                  created={new Date(2008, 7, 7, 7, 7)}
                  likes={8}
                  comments={7}
                />
                <PostCard
                  sender="Dee Makausad"
                  postContent="This is a post. Hello World. Lorem Ipsum. Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah"
                  created={new Date(2008, 7, 7, 7, 7)}
                  likes={8}
                  comments={7}
                />
                <PostCard
                  sender="Dee Makausad"
                  postContent="This is a post. Hello World. Lorem Ipsum. Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah"
                  created={new Date(2008, 7, 7, 7, 7)}
                  likes={8}
                  comments={7}
                />
                <PostCard
                  sender="Dee Makausad"
                  postContent="This is a post. Hello World. Lorem Ipsum. Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah"
                  created={new Date(2008, 7, 7, 7, 7)}
                  likes={8}
                  comments={7}
                />
              </IonCardContent>
            </IonCard>
          </IonCard>
          <IonCard id="side-card">
            <IonCard id="chat-summ">
              <IonCardHeader>
                <IonCardTitle>Chats</IonCardTitle>
              </IonCardHeader>
              <IonCardContent id="chat-summ-content">
                {
                  Object.entries(CHATS).sort((a, b) => {
                    return getLastChat(b[1]).sent.getTime() - getLastChat(a[1]).sent.getTime();
                  }).map((q, i) => {
                    if (i !== 0) return;
                    return (
                      <ChatUserCard
                        chatName={q[0]}
                        lastChat={getLastChat(q[1]).chatText}
                        sent={getLastChat(q[1]).sent}
                        onClick={() => { }}
                        isActive={true}
                      />
                    );
                  })
                }
                <IonButton id="view-chats">
                  <IonIcon slot="end" icon={arrowForward} />
                  View Chats
                </IonButton>
              </IonCardContent>
            </IonCard>
            <PlaceholderCard name="calendar here pero gasakit na akong likod unya nani" showDeets={false} />
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default Home;
