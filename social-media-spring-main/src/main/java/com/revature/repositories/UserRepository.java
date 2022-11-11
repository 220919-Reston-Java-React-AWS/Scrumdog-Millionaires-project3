package com.revature.repositories;

import com.revature.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    


    Optional<User> findByEmailAndPassword(String email, String password);

    Optional<User> findByPassword(String password);

   
    // public User findByEmail(String email);

    // public User findByResetPasswordToken(String token);
}
