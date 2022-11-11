package com.revature.services;

import com.revature.models.User;
import com.revature.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> findById(int id){

        return userRepository.findById(id);
    }

    public Optional<User> findByCredentials(String email, String password) {

        return userRepository.findByEmailAndPassword(email, password);
    }
    public Optional<User> findPassword(String password){
        return userRepository.findByPassword(password);

    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public User updatePassword(User updatePassword){
        findPassword(updatePassword.getPassword());
        return userRepository.save(updatePassword);
    }
}
