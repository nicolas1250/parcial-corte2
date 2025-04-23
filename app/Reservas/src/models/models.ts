export interface Customer {
    id?: string;
    name: string;
    phone: string;
    email: string;
    guests: number;
  }
  
  export interface Table {
    id: string;
    number: number;
    capacity: number;
    isAvailable: boolean;
  }
  
  export interface Reservation {
    id?: string;
    date: string;
    time: string;
    customer: Customer;
    tableId: string;
    status: 'pending' | 'confirmed' | 'cancelled';
  }