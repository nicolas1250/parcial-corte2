package com.example.Reserva.Service;

import com.example.Reserva.Entity.TableReservation;
import com.example.Reserva.Entity.Time;
import com.example.Reserva.Entity.User;
import com.example.Reserva.IRepository.ITableRepository;
import com.example.Reserva.IRepository.ITimeRepository;
import com.example.Reserva.IRepository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TimeServiceImpl {
    private final ITimeRepository timeRepository;

    public TimeServiceImpl(ITimeRepository timeRepository) {
        this.timeRepository = timeRepository;
    }

    public List<Time> findAll() {
        return timeRepository.findAll();
    }

    public Time save(Time time) {
        return timeRepository.save(time);
    }

    public void delete(Long id) {
        timeRepository.deleteById(id);
    }

    public Time findById(Long id) {
        return timeRepository.findById(id).orElse(null);
    }
}