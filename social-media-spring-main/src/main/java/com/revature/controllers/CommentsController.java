package com.revature.controllers;

import com.revature.models.Comments;
import com.revature.models.Post;
import com.revature.models.User;
import com.revature.services.CommentsService;
import com.revature.services.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/comments")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"}, allowCredentials = "true")
public class CommentsController {

    private final CommentsService commentsService;
    private final PostService postService;

    public CommentsController(CommentsService commentsService, PostService postService) {
        this.commentsService = commentsService;
        this.postService = postService;
    }


//    @Authorized
    @PostMapping
    public ResponseEntity<Comments> upsertComment(@RequestBody Comments comment){
        return ResponseEntity.ok(this.commentsService.upsert(comment));
    }

    @GetMapping("{postid}")
    public ResponseEntity<List<Comments>> getAllByPost(@PathVariable("postid")int id,  HttpSession session) {
        Optional<Post> optional = postService.findById(id);

        if (!optional.isPresent()) {
            return ResponseEntity.badRequest().build();
        } else {
            Post post = optional.get();
            System.out.println(post);
            session.setAttribute("post", optional.get());

            return ResponseEntity.ok(this.commentsService.getAllByPostId(post));
        }
    }
}
