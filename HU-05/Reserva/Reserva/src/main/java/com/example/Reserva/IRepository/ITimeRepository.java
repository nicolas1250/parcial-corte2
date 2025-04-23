package com.example.Reserva.IRepository;

import com.example.Reserva.Entity.Time;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface ITimeRepository extends JpaRepository<Time, Long> {
}
