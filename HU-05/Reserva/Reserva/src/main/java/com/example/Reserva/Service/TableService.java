package com.example.Reserva.Service;

import com.example.Reserva.Entity.TableReservation;

import java.util.List;

public interface TableService  {
    public List<TableReservation> findall();
    public TableReservation findById(Long id);
    public TableReservation save(TableReservation table);
    public void delete(Long id);
}
