package com.example.Reserva.Controller;

import com.example.Reserva.Entity.TableReservation;
import com.example.Reserva.Entity.Time;
import com.example.Reserva.Entity.User;
import com.example.Reserva.Service.TimeService;
import com.example.Reserva.Service.TimeServiceImpl;
import com.example.Reserva.Service.UserService;
import com.example.Reserva.Service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/horario")
public class TimeController {
    private final TimeServiceImpl timeService;

    public TimeController(TimeServiceImpl timeService) {
        this.timeService = timeService;
    }

    @GetMapping
    public List<Time> getAll() {
        return timeService.findAll();
    }

    @PostMapping
    public Time create(@RequestBody Time time) {
        return timeService.save(time);
    }

    @GetMapping("/{id}")
    public Time getById(@PathVariable Long id) {
        return timeService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        timeService.delete(id);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Time> updateTime(
            @PathVariable Long id,
            @RequestBody Time time) {

        Time existente = timeService.findById(id);
        if (existente == null) {
            return ResponseEntity.notFound().build();
        }

        // Actualiza sólo los campos que quieras permitir modificar
        existente.setFecha(time.getFecha());
        existente.setHora(time.getHora());
        existente.setUser(time.getUser());
        existente.setMesa(time.getMesa());




        Time actualizado = timeService.save(existente);
        return ResponseEntity.ok(actualizado);
    }
}


