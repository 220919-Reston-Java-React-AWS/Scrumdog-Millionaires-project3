package com.revature.services;

import com.revature.models.Comments;
import com.revature.models.Post;
import com.revature.repositories.CommentsRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;


@Service
public class CommentsService {

    private CommentsRepository commentsRepository;
    private PostService postService;

    public List<Comments> getAllByPostId(Post post){
            return this.commentsRepository.findCommentByPost(post);

    }

    public Comments upsert(Comments comment) {
        return this.commentsRepository.save(comment);
    }
}
