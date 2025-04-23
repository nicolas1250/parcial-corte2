package com.example.Reserva.IRepository;

import com.example.Reserva.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface IUserRepository extends JpaRepository<User, Long> {
}
