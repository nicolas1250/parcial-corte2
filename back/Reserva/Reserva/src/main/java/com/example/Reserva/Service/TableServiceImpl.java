package com.example.Reserva.Service;

import com.example.Reserva.Entity.TableReservation;
import com.example.Reserva.Entity.Time;
import com.example.Reserva.IRepository.ITableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TableServiceImpl {
    private final ITableRepository tableRepository;

    public TableServiceImpl(ITableRepository tableRepository) {
        this.tableRepository = tableRepository;
    }

    public List<TableReservation> findAll() {
        return tableRepository.findAll();
    }

    public TableReservation save(TableReservation tableReservation) {
        return tableRepository.save(tableReservation);
    }

    public void delete(Long id) {
        tableRepository.deleteById(id);
    }

    public TableReservation findById(Long id) {
        return tableRepository.findById(id).orElse(null);
    }
}


