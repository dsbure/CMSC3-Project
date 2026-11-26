import type { IonModalCustomEvent, OverlayEventDetail } from '@ionic/core';
import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonPage,
  useIonRouter,
} from '@ionic/react';
import './Home.css';
import '../theme/page.css';
import { add, arrowForward, chatboxEllipsesOutline, heartOutline, shareSocial } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';

import AppBar from '../components/AppBar';
import PlaceholderCard from '../components/PlaceholderCard';
import ChatUserCard from '../components/chats/ChatUserCard';
import CreatePostModal from '../components/home/CreatePostModal';
import { MediaItem } from '../components/home/MediaItem';
import { _onAddPost, CHATS, POSTS, UNI_NAME, USER } from '../constants';
import type { IPost } from '../interfaces/IPost';
import { getLastChat, toShortTimeString } from '../util';


type PostCardProps = {
  sender: string;
  postContent: string;
  postMedia?: string[];
  created: Date;

  likes: number;
  comments: number; // arraych
};

const PostCard: React.FC<PostCardProps> = ({ sender, postContent, postMedia, created, likes, comments }: PostCardProps) => {
  return (
    <div className="postcard">
      <div className="post-content">{postContent.split("\n").map((q, i) => {
        return <p key={i}>{q}</p>
      })}</div>
      {
       postMedia ?
          <div className="media-preview">
            {
              postMedia.map((q, i) => {
                return <MediaItem
                  key={i}
                  media={q}
                  isRemovable={false}
                />
              })
            }
            </div>
          : null
      }
      <div className="post-footer">
        <div className="post-info-container">
          <IonAvatar className="account-icon">
            <img src={"https://api.dicebear.com/10.x/pixelbot/svg?tags=animation&rotate=-15&scale=0.7&seed=" + encodeURIComponent(sender)} />
          </IonAvatar>
          <div className="post-info">
            <p>{'from ' + sender}</p>
            <p>{toShortTimeString(created)}</p>
          </div>
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
            Share
          </IonButton>
        </div>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const router = useIonRouter();
  const [posts, setPosts] = useState<IPost[]>(POSTS);
  const [_force, setForce] = useState(0);
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonTextareaElement>(null);
  const media = useRef<HTMLInputElement>(null);

  const _forceRender = () => setForce((_forceRender) => _forceRender + 1);

  useEffect(() => {
    const unsub = _onAddPost(() => {
      setPosts(POSTS);
      _forceRender();
    });
    return () => unsub();
  }, []);

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
                {posts
                  .sort((a, b) => b.created.getTime() - a.created.getTime())
                  .map((q, i) => {
                    return (
                      <PostCard
                        key={i}
                        sender={q.sender}
                        postContent={q.postContent}
                        created={q.created}
                        postMedia={q.postMedia ?? undefined}
                        likes={q.likes}
                        comments={q.comments}
                      />
                    );
                  })}
              </IonCardContent>
            </IonCard>
          </IonCard>
          <IonCard id="side-card">
            <IonCard id="chat-summ">
              <IonCardHeader>
                <IonCardTitle>Chats</IonCardTitle>
              </IonCardHeader>
              <IonCardContent id="chat-summ-content">
                {Object.entries(CHATS)
                  .sort((a, b) => {
                    return getLastChat(b[1]).sent.getTime() - getLastChat(a[1]).sent.getTime();
                  })
                  .map((q, i) => {
                    if (i !== 0) return;
                    return (
                      <ChatUserCard
                        key={i}
                        chatName={q[0]}
                        lastChat={getLastChat(q[1]).chatText}
                        sent={getLastChat(q[1]).sent}
                        onClick={() => {
                          router.push('/chats?chat=' + encodeURIComponent(q[0]), 'forward');
                        }}
                        isActive={true}
                      />
                    );
                  })}
                <IonButton id="view-chats" routerLink="/chats" routerDirection="forward">
                  <IonIcon slot="end" icon={arrowForward} />
                  View Chats
                </IonButton>
              </IonCardContent>
            </IonCard>
            <PlaceholderCard name="calendar here pero gasakit na akong likod unya nani" showDeets={false} />
          </IonCard>
        </div>
        <CreatePostModal
          ref={modal}
          trigger={'create-post'}
          input={input}
          media={media}
          onDismiss={(_e: IonModalCustomEvent<OverlayEventDetail>): void => {

          }}
        />
      </IonContent>
    </IonPage>
  );
};
export default Home;
