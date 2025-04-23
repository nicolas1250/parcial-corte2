import { Customer, Reservation, Table } from '../models/models';

class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  // Obtener mesas disponibles por fecha y hora
  async getAvailableTables(date: string, time: string): Promise<Table[]> {
    // En una implementación real, esto haría una llamada a la API
    // Para este ejemplo, retornamos datos mockeados
    return [
      { id: '1', number: 1, capacity: 2, isAvailable: true },
      { id: '2', number: 2, capacity: 4, isAvailable: true },
      { id: '3', number: 3, capacity: 6, isAvailable: false },
      { id: '4', number: 4, capacity: 8, isAvailable: true },
      { id: '5', number: 5, capacity: 2, isAvailable: true },
    ];
  }

  // Crear una nueva reserva
  async createReservation(reservation: Reservation): Promise<Reservation> {
    try {
      // En una implementación real, esto enviaría datos a la API
      console.log('Creando reserva:', reservation);
      // Simulamos una respuesta exitosa
      return {
        ...reservation,
        id: Math.random().toString(36).substring(2, 15),
        status: 'confirmed'
      };
    } catch (error) {
      console.error('Error al crear la reserva:', error);
      throw error;
    }
  }

  // Obtener todas las reservas
  async getReservations(): Promise<Reservation[]> {
    // En una implementación real, esto haría una llamada a la API
    return [];
  }

  // Actualizar una reserva existente
  async updateReservation(id: string, reservation: Reservation): Promise<Reservation> {
    try {
      // En una implementación real, esto actualizaría la reserva en la API
      console.log('Actualizando reserva:', id, reservation);
      return { ...reservation, id };
    } catch (error) {
      console.error('Error al actualizar la reserva:', error);
      throw error;
    }
  }

  // Cancelar una reserva
  async cancelReservation(id: string): Promise<void> {
    try {
      // En una implementación real, esto cancelaría la reserva en la API
      console.log('Cancelando reserva:', id);
    } catch (error) {
      console.error('Error al cancelar la reserva:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();