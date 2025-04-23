import React, { useState, useEffect } from 'react';
import { IonGrid, IonRow, IonCol, IonCard, IonCardContent } from '@ionic/react';
import './TableSelection.css';

interface TableSelectionProps {
  onTableSelect: (table: string) => void;
  date: string | null;
  time: string | null;
  guests: number;
  initialTable?: string | null; 
}

interface Table {
  id: string;
  capacity: number;
  available: boolean;
  position: { x: number; y: number };
}

const TableSelection: React.FC<TableSelectionProps> = ({ onTableSelect, date, time, guests }) => {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [tables, setTables] = useState<Table[]>([]);
  
  // Simulación de obtención de mesas disponibles
  useEffect(() => {
    if (date && time) {
      // En un caso real, esto sería una llamada a API
      // para obtener mesas disponibles según fecha/hora
      const mockTables: Table[] = [
        { id: 'T1', capacity: 2, available: true, position: { x: 0, y: 0 } },
        { id: 'T2', capacity: 4, available: true, position: { x: 1, y: 0 } },
        { id: 'T3', capacity: 6, available: true, position: { x: 2, y: 0 } },
        { id: 'T4', capacity: 2, available: false, position: { x: 0, y: 1 } },
        { id: 'T5', capacity: 4, available: true, position: { x: 1, y: 1 } },
        { id: 'T6', capacity: 8, available: true, position: { x: 2, y: 1 } },
        { id: 'T7', capacity: 4, available: true, position: { x: 0, y: 2 } },
        { id: 'T8', capacity: 6, available: false, position: { x: 1, y: 2 } },
        { id: 'T9', capacity: 2, available: true, position: { x: 2, y: 2 } },
      ];
      
      // Filtrar mesas por capacidad
      const filteredTables = mockTables.filter(table => table.capacity >= guests);
      setTables(filteredTables);
    } else {
      setTables([]);
    }
  }, [date, time, guests]);

  const handleTableSelect = (tableId: string) => {
    setSelectedTable(tableId);
    onTableSelect(tableId);
  };

  if (!date || !time) {
    return (
      <div className="table-selection-placeholder">
        Por favor, seleccione primero una fecha y hora.
      </div>
    );
  }

  return (
    <div className="table-selection">
      <div className="restaurant-layout">
        <div className="layout-legend">
          <div className="legend-item">
            <div className="table-icon available"></div> Disponible
          </div>
          <div className="legend-item">
            <div className="table-icon selected"></div> Seleccionada
          </div>
          <div className="legend-item">
            <div className="table-icon occupied"></div> No disponible
          </div>
        </div>

        <IonGrid className="layout-grid">
          {Array(3).fill(0).map((_, row) => (
            <IonRow key={row}>
              {Array(3).fill(0).map((_, col) => {
                const table = tables.find(t => t.position.x === col && t.position.y === row);
                return (
                  <IonCol key={col} size="4">
                    {table ? (
                      <div 
                        className={`table-icon 
                          ${table.available ? 'available' : 'occupied'} 
                          ${selectedTable === table.id ? 'selected' : ''}`}
                        onClick={() => table.available && handleTableSelect(table.id)}
                      >
                        <div className="table-id">{table.id}</div>
                        <div className="table-capacity">{table.capacity} pers.</div>
                      </div>
                    ) : (
                      <div className="empty-space"></div>
                    )}
                  </IonCol>
                );
              })}
            </IonRow>
          ))}
        </IonGrid>
      </div>
    </div>
  );
};

export default TableSelection;