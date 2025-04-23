import React from 'react';
import { IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonIcon } from '@ionic/react';
import './ClientForm.css';

interface ClientFormProps {
  clientData: {
    name: string;
    phone: string;
    email: string;
    guests: number;
  };
  onChange: (data: any) => void;
}

const ClientForm: React.FC<ClientFormProps> = ({ clientData, onChange }) => {
  return (
    <div className="client-form">
      <IonItem>
        <IonLabel position="stacked">
          <IonIcon name="person" /> Nombre y Apellido*
        </IonLabel>
        <IonInput
          value={clientData.name}
          onIonChange={(e) => onChange({ name: e.detail.value })}
          required
        />
      </IonItem>

      <IonItem>
        <IonLabel position="stacked">
          <IonIcon name="call" /> Teléfono*
        </IonLabel>
        <IonInput
          type="tel"
          value={clientData.phone}
          onIonChange={(e) => onChange({ phone: e.detail.value })}
          required
        />
      </IonItem>

      <IonItem>
        <IonLabel position="stacked">
          <IonIcon name="mail" /> Email
        </IonLabel>
        <IonInput
          type="email"
          value={clientData.email}
          onIonChange={(e) => onChange({ email: e.detail.value })}
        />
      </IonItem>

      <IonItem>
        <IonLabel position="stacked">
          <IonIcon name="people" /> Número de Comensales
        </IonLabel>
        <IonSelect
          value={clientData.guests}
          onIonChange={(e) => onChange({ guests: e.detail.value })}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
            <IonSelectOption key={num} value={num}>
              {num} {num === 1 ? 'persona' : 'personas'}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>

      <div className="form-note">* Campos requeridos</div>
    </div>
  );
};

export default ClientForm;