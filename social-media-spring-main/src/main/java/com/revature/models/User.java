package com.revature.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Clob;

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

   @Column(name = "about_me", columnDefinition = "TEXT")
    private String aboutMe;
//
//    @Lob
//    private Clob places;


    // @Column(name= "reset_password_token")
    // private String resetPasswordToken = null;

//    @OneToMany(cascade = CascadeType.ALL)
//    private int likes;


    public User (String email, String password){
        this.email = email;
        this.password = password;
    }

    public User(String email, String password, String firstName, String lastName) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }


    public User(int id, String email, String password, String firstName, String lastName) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

