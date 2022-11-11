package com.revature.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;


    // @Column(name= "reset_password_token")
    // private String resetPasswordToken = null;

//    @OneToMany(cascade = CascadeType.ALL)
//    private int likes;


    public User (int id, String password){
        this.id = id;
        this.password = password;
    }
    
}

