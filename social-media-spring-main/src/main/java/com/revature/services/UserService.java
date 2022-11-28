package com.revature.services;

import com.revature.dtos.LoginRequest;
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

    public User findByEmail(String email){
        return userRepository.findByEmail(email);
    }
    // public Optional<User> findPassword(String password){
    //     return userRepository.findByPassword(password);

    // }

    public User save(User user) {
        return userRepository.save(user);
    }

    public User updatePassword(LoginRequest updatingpassword){
        User user = findByEmail(updatingpassword.getEmail());
        user.setPassword(updatingpassword.getPassword());
        return userRepository.save(user);
    }

    public String getAboutMe(User user){
        return user.getAboutMe();
    }

}


