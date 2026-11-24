
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/react';
import './PlaceholderCard.css';

interface CardProps {
    name?: string;
    showDeets?: boolean;
}

const PlaceholderCard: React.FC<CardProps> = ({ name = "yea", showDeets = true }) => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>{name}</IonCardTitle>
                <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            </IonCardHeader>

            {
                showDeets ?
                <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
                :
                null
            }
        </IonCard>
    );
};

export default PlaceholderCard;
