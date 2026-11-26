import type { IonModalCustomEvent, OverlayEventDetail } from '@ionic/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonModal,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { close, images } from 'ionicons/icons';
import { useEffect, useState, type Ref } from 'react';

import './CreatePostModal.css';
import { _addPost, USER } from '../../constants';
import { toShortTimeString } from '../../util';

import { MediaItem } from './MediaItem';


type CreatePostModalProps = {
  ref: Ref<HTMLIonModalElement>;
  trigger: string;
  input: Ref<HTMLIonTextareaElement>;
  media: Ref<HTMLInputElement>;
  onDismiss: (e: IonModalCustomEvent<OverlayEventDetail>) => void;
};

const CreatePostModal: React.FC<CreatePostModalProps> = ({ ref, trigger, input, media, onDismiss }: CreatePostModalProps) => {
  const [time, setTime] = useState<Date>(new Date());
  const [currentMedia, setMedia] = useState<FileList | null>(null);
  const [mediaElements, setMediaElements] = useState<string[]>([]);

  useEffect(() => {
    if (currentMedia === null) return;
    const files: string[] = [];
    for (const file of currentMedia) {
      files.push(URL.createObjectURL(file));
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMediaElements((_mediaElements: string[]) => {
      files.forEach((e) => {
        _mediaElements.push(e)
      });
      return [...new Set(_mediaElements)];
    });
  }, [currentMedia]);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const clearMedia = () => {
    setMediaElements(_media => []);
    setMedia(_media => null);
    // @ts-expect-error ref
    // eslint-disable-next-line react-hooks/immutability
    media.current.value = '';
  };

  return (
    <IonModal id="create-post-modal" ref={ref} trigger={trigger} onWillDismiss={(event) => onDismiss(event)}>
      <input type="file" id="media" multiple accept="image/*" ref={media} onChange={(e) => {
        setMedia(_media => e.target.files ?? null);
      }} />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              onClick={() => {
                clearMedia();
                // @ts-expect-error ref
                ref.current?.dismiss();
              }}
            >
              <IonIcon slot="icon-only" icon={close} />
            </IonButton>
          </IonButtons>
          <IonTitle>Create Post</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonTextarea ref={input} autoGrow placeholder="Aa" />
        </IonItem>
        <div className="media-preview">
          {
            mediaElements.map((q, i) => {
              return <MediaItem
                key={i}
                media={q}
                remove={(): void => {
                  setMediaElements((_mediaElements: string[]) => {
                    _mediaElements = _mediaElements.filter(e => e !== q);
                    return _mediaElements;
                  })
                }}
              />
            })
          }
        </div>
        <div className="modal-footer">
          <div className="post-info">
            <p>{'from ' + USER.name}</p>
            <p>{toShortTimeString(time)}</p>
          </div>
          <div className="footer-buttons">
            <IonButton id="add-media" strong={true} onClick={() => {
              // @ts-expect-error ref
              media?.current.showPicker();
            }}>
              <IonIcon slot="icon-only" icon={images} />
            </IonButton>
            <IonButton id="create-confirm" strong={true} onClick={() => {
              // @ts-expect-error ref
              if (!input.current?.value.trim()) return;
              clearMedia();
              // @ts-expect-error ref
              _addPost(input.current?.value, USER.name, mediaElements);
              // @ts-expect-error ref
              ref.current?.dismiss();
            }}>
              Create
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default CreatePostModal;
