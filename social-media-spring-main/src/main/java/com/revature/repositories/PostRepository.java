package com.revature.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.revature.models.Post;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;

public interface PostRepository extends JpaRepository<Post, Integer>{

    @Modifying
    @Query(value = "UPDATE posts SET like_count = like_count + 1 WHERE id = 1",
    nativeQuery = true)
    int increaseLikeCount();

//    @Query(value = "UPDATE posts SET like_count = like_count - 1 WHERE id = 1", nativeQuery = true)
//    int decreaseLikeCount();

}
