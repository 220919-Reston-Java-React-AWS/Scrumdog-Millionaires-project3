package com.revature.controllers;

import com.revature.models.*;
import com.revature.services.CommentsService;
import com.revature.services.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;
import com.revature.repositories.CommentsRepository;

@RestController
@RequestMapping("/comments")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000" , "http://travelogfe.s3-website-us-east-1.amazonaws.com/"}, allowCredentials = "true")
public class CommentsController {

    private final CommentsService commentsService;
    private final PostService postService;

    private final CommentsRepository commentsRepository;

    public CommentsController(CommentsService commentsService, PostService postService, CommentsRepository commentsRepository) {
        this.commentsService = commentsService;
        this.postService = postService;
        this.commentsRepository = commentsRepository;
    }

    @PostMapping
    public ResponseEntity<Comments> upsertComment(@RequestBody Comments comment){
        return ResponseEntity.ok(this.commentsService.upsert(comment));
    }

    //Get all the comments associated with a specific post
    @GetMapping("/{postid}")
    public ResponseEntity<List<Comments>> getAllByPost(@PathVariable("postid")int id,  HttpSession session) {
        Optional<Post> optional = postService.findById(id);

        if (!optional.isPresent()) {
            return ResponseEntity.badRequest().build();
        } else {
            Post post = optional.get();
            session.setAttribute("post", optional.get());

            return ResponseEntity.ok(this.commentsService.getAllByPostId(post));
        }
    }

    @DeleteMapping("/{id}")
    void deleteComment(@PathVariable int id){this.commentsRepository.deleteById(id);}

//    @PostMapping("/likecomment")
//    public ResponseEntity<ResponseObjectService>likeComment(@RequestBody CommentLikes likesId){
//        return new ResponseEntity<ResponseObjectService>(commentsService.updateCommentByLike(likesId), HttpStatus.OK);
//    }

}
