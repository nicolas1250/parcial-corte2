package com.example.Reserva.Service;

import com.example.Reserva.Entity.Time;
import com.example.Reserva.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TimeService {
    public List<Time> findall();
    public Time findById(Long id);
    public Time save(Time time);
    public void delete(Long id);
}
