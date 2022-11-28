package com.revature.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.data.annotation.CreatedDate;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "posts")
public class Post {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	private String text;
	private String imageUrl;
	@CreatedDate
	private Date createdAt;

	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = "likes", joinColumns = @JoinColumn(name = "post_id"))
	private List<Integer> likes = new ArrayList<>();

    @JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "post")
	private List<Comments> comments;

	@ManyToOne
	private User author;



}
