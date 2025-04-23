package com.example.Reserva.Service;

import com.example.Reserva.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserService{
public List<User> findall();
public User findById(Long id);
public User save(User usuario);
public void delete(Long id);
}
