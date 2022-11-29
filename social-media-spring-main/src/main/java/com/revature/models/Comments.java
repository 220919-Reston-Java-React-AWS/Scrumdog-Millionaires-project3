package com.revature.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

//Can't use the @Data annotation here to avoid running into a recursive problem with the toString override
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

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User author;

//    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @ElementCollection
    @CollectionTable(name = "likes", joinColumns = @JoinColumn(name = "post_id"))
    private List<Integer> likes = new ArrayList<>();

    public Comments(int id, String text, User author, Post post) {
        this.id = id;
        this.text = text;
        this.author = author;
        this.post = post;
    }

    @Override
    public String toString() {
        return "Comments{" +
                "id=" + id +
                ", text='" + text + '\'' +
                ", author=" + author +
                '}';
    }
}
