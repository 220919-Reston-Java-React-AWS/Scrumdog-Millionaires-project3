package com.revature.repositories;

import com.revature.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import com.revature.models.Post;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Integer>{
    List<Post> findPostByAuthor(User user);

    @Modifying
    @Query(value = "UPDATE posts SET like_count = like_count + 1 WHERE id = 1",
    nativeQuery = true)
    int increaseLikeCount();

//    @Query(value = "UPDATE posts SET like_count = like_count - 1 WHERE id = 1", nativeQuery = true)
//    int decreaseLikeCount();

}
