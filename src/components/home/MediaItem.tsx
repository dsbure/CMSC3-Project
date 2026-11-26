import { IonIcon } from '@ionic/react';
import { close } from 'ionicons/icons';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

type MediaItemProps = {
  media: string;
  isRemovable?: boolean;
  remove?: () => void;
};

const CloseIcon: React.FC = () => {
  return (
    <IonIcon icon={close} className="img-zoom-close" />
  );
};

export const MediaItem: React.FC<MediaItemProps> = ({ media, remove, isRemovable = true }: MediaItemProps) => {
  return (
    <Zoom IconUnzoom={CloseIcon}>
      <div className="media-container">
        {isRemovable ? (
          <button className="remove-media" onClick={remove}>
            <IonIcon icon={close} />
          </button>
        ) : null}
        <img src={media} className="media-item" />
      </div>
    </Zoom>
  );
};
