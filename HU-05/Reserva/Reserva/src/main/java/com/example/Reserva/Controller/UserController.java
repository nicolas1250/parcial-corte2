package com.example.Reserva.Controller;

import com.example.Reserva.Entity.Time;
import com.example.Reserva.Entity.User;
import com.example.Reserva.Service.UserService;
import com.example.Reserva.Service.UserServiceImpl;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class UserController {
    private final UserServiceImpl userService;

    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAll() {
        return userService.findAll();
    }

    @PostMapping
    public User create(@RequestBody User user) {
        return userService.save(user);
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable Long id) {
        return userService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }
    @PutMapping("/{id}")
    public ResponseEntity<User> updateCliente(
            @PathVariable Long id,
            @RequestBody User user) {

        User existente = userService.findById(id);
        if (existente == null) {
            return ResponseEntity.notFound().build();
        }

        // Actualiza sólo los campos que quieras permitir modificar
        existente.setName(user.getName());
        existente.setLastName(user.getLastName());
        existente.setTelefono(user.getTelefono());
        existente.setEmail(user.getEmail());
        existente.setComensales(user.getComensales());




        User actualizado = userService.save(existente);
        return ResponseEntity.ok(actualizado);
    }
}
