package com.revature.repositories;

import com.revature.models.Comments;
import com.revature.models.Post;
import com.revature.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentsRepository extends JpaRepository<Comments, Integer> {
    List<Comments> findCommentByAuthor(User user);

    List<Comments> findCommentByPost (Post post);
}
