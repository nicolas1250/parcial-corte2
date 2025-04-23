package com.example.Reserva.Controller;

import com.example.Reserva.Entity.TableReservation;
import com.example.Reserva.Service.TableServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/asignacion")
public class TableController {
    private TableServiceImpl tableService;

    public void UserController(TableServiceImpl tableService) {
        this.tableService = tableService;
    }

    @GetMapping
    public List<TableReservation> getAll() {
        return tableService.findAll();
    }

    @PostMapping
    public TableReservation create(@RequestBody TableReservation tableReservation) {
        return tableService.save(tableReservation);
    }

    @GetMapping("/{id}")
    public TableReservation getById(@PathVariable Long id) {
        return tableService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        tableService.delete(id);
    }
    @PutMapping("/{id}")
    public ResponseEntity<TableReservation> updateTable(
            @PathVariable Long id,
            @RequestBody TableReservation tableReservation) {

        TableReservation existente = tableService.findById(id);
        if (existente == null) {
            return ResponseEntity.notFound().build();
        }

        // Actualiza sólo los campos que quieras permitir modificar
        existente.setCapacidad(tableReservation.getCapacidad());
        existente.setDisponible(tableReservation.getDisponible());


        TableReservation actualizado = tableService.save(existente);
        return ResponseEntity.ok(actualizado);
    }
}

