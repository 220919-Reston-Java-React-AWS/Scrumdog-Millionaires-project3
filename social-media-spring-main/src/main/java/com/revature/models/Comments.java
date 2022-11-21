package com.revature.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

//@Data
@Getter
@Setter
@EqualsAndHashCode
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "comments")
public class Comments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String text;

//    private int post_id;
//    private int user_id;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User author;

//    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;


    @Override
    public String toString() {
        return "Comments{" +
                "id=" + id +
                ", text='" + text + '\'' +
                ", author=" + author +
                '}';
    }
}
