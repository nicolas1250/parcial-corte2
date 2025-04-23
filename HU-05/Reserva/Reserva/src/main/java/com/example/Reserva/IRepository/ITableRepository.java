package com.example.Reserva.IRepository;

import com.example.Reserva.Entity.TableReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface ITableRepository extends JpaRepository<TableReservation, Long> {
}
