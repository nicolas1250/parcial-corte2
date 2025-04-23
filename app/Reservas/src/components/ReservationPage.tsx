import React, { useState, useEffect } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonButton, 
  IonIcon, 
  IonDatetime,
  IonModal,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonAlert,
  IonToast,
  IonProgressBar,
  IonSegment,
  IonSegmentButton
} from '@ionic/react';
import { calendarOutline, checkmarkCircleOutline } from 'ionicons/icons';
import TimePicker from '../components/TimePicker';
import ClientForm from '../components/ClientForm';
import TableSelection from '../components/TableSelection';
import './ReservationPage.css';

const ReservationPage: React.FC = () => {
  // Estados para manejar el proceso de reserva
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [isDateModalOpen, setIsDateModalOpen] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  // Estado para datos del cliente
  const [clientData, setClientData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: 2,
  });

  // Formatear fecha para mostrar
  const formatDate = (isoDate: string | null): string => {
    if (!isoDate) return '';
    
    const date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    return date.toLocaleDateString('es-ES', options);
  };

  // Actualizar datos del cliente
  const handleClientDataChange = (data: any) => {
    setClientData(prevData => ({ ...prevData, ...data }));
  };

  // Validar si se puede avanzar al siguiente paso
  const canProceedToNextStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return selectedDate !== null && selectedTime !== null;
      case 2:
        return selectedTable !== null;
      case 3:
        return clientData.name.trim() !== '' && clientData.phone.trim() !== '';
      default:
        return false;
    }
  };

  // Avanzar al siguiente paso
  const nextStep = () => {
    if (!canProceedToNextStep()) {
      setToastMessage('Por favor complete todos los campos requeridos');
      setShowToast(true);
      return;
    }
    
    if (currentStep < 4) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  // Retroceder al paso anterior
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  // Confirmar reserva
  const confirmReservation = () => {
    // Aquí iría la lógica para enviar la reserva a un servidor
    console.log('Reserva confirmada:', {
      date: selectedDate,
      time: selectedTime,
      table: selectedTable,
      client: clientData
    });
    
    setShowConfirmation(true);
  };

  // Iniciar nueva reserva
  const startNewReservation = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedTable(null);
    setClientData({
      name: '',
      phone: '',
      email: '',
      guests: 2,
    });
    setCurrentStep(1);
    setShowConfirmation(false);
  };

  // Calcular el progreso actual
  const calculateProgress = (): number => {
    return currentStep / 4;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Gestión de Reservas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {!showConfirmation ? (
          <>
            <IonProgressBar value={calculateProgress()} color="secondary"></IonProgressBar>
            
            <div className="steps-indicator">
              <IonSegment value={currentStep.toString()}>
                <IonSegmentButton value="1">
                  <IonLabel>Fecha</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="2">
                  <IonLabel>Mesa</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="3">
                  <IonLabel>Cliente</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="4">
                  <IonLabel>Confirmar</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </div>

            {currentStep === 1 && (
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Seleccione Fecha y Hora</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem button onClick={() => setIsDateModalOpen(true)}>
                    <IonIcon icon={calendarOutline} slot="start" />
                    <IonLabel>
                      {selectedDate ? formatDate(selectedDate) : 'Seleccionar fecha'}
                    </IonLabel>
                  </IonItem>
                  
                  {selectedDate && <TimePicker onTimeSelect={setSelectedTime} />}
                </IonCardContent>
              </IonCard>
            )}

            {currentStep === 2 && (
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Seleccione una Mesa</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <div className="reservation-summary">
                    <p><strong>Fecha:</strong> {formatDate(selectedDate!)}</p>
                    <p><strong>Hora:</strong> {selectedTime}</p>
                    <p><strong>Comensales:</strong> {clientData.guests}</p>
                  </div>
                  
                  <TableSelection 
                    onTableSelect={setSelectedTable} 
                    date={selectedDate} 
                    time={selectedTime}
                    guests={clientData.guests}
                  />
                </IonCardContent>
              </IonCard>
            )}

            {currentStep === 3 && (
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Datos del Cliente</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <ClientForm 
                    clientData={clientData} 
                    onChange={handleClientDataChange} 
                  />
                </IonCardContent>
              </IonCard>
            )}

            {currentStep === 4 && (
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Confirmar Reserva</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <div className="reservation-summary">
                    <h2>Resumen de la Reserva</h2>
                    <p><strong>Fecha:</strong> {formatDate(selectedDate!)}</p>
                    <p><strong>Hora:</strong> {selectedTime}</p>
                    <p><strong>Mesa:</strong> {selectedTable}</p>
                    <p><strong>Comensales:</strong> {clientData.guests}</p>
                    <p><strong>Cliente:</strong> {clientData.name}</p>
                    <p><strong>Teléfono:</strong> {clientData.phone}</p>
                    {clientData.email && (
                      <p><strong>Email:</strong> {clientData.email}</p>
                    )}
                  </div>
                  
                  <IonButton 
                    expand="block" 
                    color="success" 
                    onClick={confirmReservation}
                  >
                    <IonIcon icon={checkmarkCircleOutline} slot="start" />
                    Confirmar Reserva
                  </IonButton>
                </IonCardContent>
              </IonCard>
            )}

            <div className="navigation-buttons">
              {currentStep > 1 && (
                <IonButton onClick={prevStep} fill="outline">
                  Atrás
                </IonButton>
              )}
              
              {currentStep < 4 && (
                <IonButton onClick={nextStep} disabled={!canProceedToNextStep()}>
                  Siguiente
                </IonButton>
              )}
            </div>
          </>
        ) : (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>¡Reserva Confirmada!</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div className="confirmation-message">
                <IonIcon 
                  icon={checkmarkCircleOutline} 
                  color="success" 
                  size="large" 
                  className="confirmation-icon"
                />
                <h2>Gracias por su reserva</h2>
                <p>Se ha confirmado su reserva con los siguientes detalles:</p>
                
                <div className="reservation-summary">
                  <p><strong>Fecha:</strong> {formatDate(selectedDate!)}</p>
                  <p><strong>Hora:</strong> {selectedTime}</p>
                  <p><strong>Mesa:</strong> {selectedTable}</p>
                  <p><strong>Comensales:</strong> {clientData.guests}</p>
                  <p><strong>A nombre de:</strong> {clientData.name}</p>
                </div>
                
                <p>Recibirá una confirmación por SMS al número {clientData.phone}</p>
                {clientData.email && (
                  <p>y por email a {clientData.email}</p>
                )}
              </div>
              
              <IonButton 
                expand="block" 
                onClick={startNewReservation}
              >
                Realizar nueva reserva
              </IonButton>
            </IonCardContent>
          </IonCard>
        )}

        {/* Modal para selección de fecha */}
        <IonModal isOpen={isDateModalOpen} onDidDismiss={() => setIsDateModalOpen(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Seleccionar Fecha</IonTitle>
              <IonButton 
                slot="end" 
                fill="clear" 
                onClick={() => setIsDateModalOpen(false)}
              >
                Cerrar
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonDatetime
              presentation="date"
              min={new Date().toISOString()}
              value={selectedDate}
              onIonChange={e => setSelectedDate(typeof e.detail.value === 'string' ? e.detail.value : null)}
              locale="es-ES"
            />
            <IonButton 
              expand="block" 
              className="ion-margin" 
              onClick={() => setIsDateModalOpen(false)}
            >
              Confirmar Fecha
            </IonButton>
          </IonContent>
        </IonModal>

        {/* Toast para mensajes */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default ReservationPage;