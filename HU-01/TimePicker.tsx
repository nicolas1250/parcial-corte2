import React, { useState } from 'react';
import { IonLabel, IonItem, IonList, IonRadioGroup, IonRadio, IonListHeader } from '@ionic/react';
import './TimePicker.css';

interface TimePickerProps {
  onTimeSelect: (time: string) => void;
  initialTime?: string | null;
}

const TimePicker: React.FC<TimePickerProps> = ({ onTimeSelect }) => {
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Horarios disponibles (ejemplo)
  const availableTimes = [
    '13:00', '13:30', '14:00', '14:30',
    '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  const handleTimeChange = (e: CustomEvent) => {
    setSelectedTime(e.detail.value);
    onTimeSelect(e.detail.value);
  };

  return (
    <div className="time-picker">
      <IonItem lines="none">
        <IonLabel>Hora</IonLabel>
        <IonLabel slot="end">{selectedTime}</IonLabel>
      </IonItem>
      
      <IonList>
        <IonListHeader>Seleccione un horario disponible</IonListHeader>
        <IonRadioGroup value={selectedTime} onIonChange={handleTimeChange}>
          <div className="time-slots">
            {availableTimes.map((time) => (
              <IonItem key={time} className="time-slot">
                <IonLabel>{time}</IonLabel>
                <IonRadio slot="start" value={time} />
              </IonItem>
            ))}
          </div>
        </IonRadioGroup>
      </IonList>
    </div>
  );
};

export default TimePicker;