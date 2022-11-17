package com.revature.controllers;

import java.util.List;

import com.revature.models.Comments;
import com.revature.models.Likes;
import com.revature.services.CommentsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.revature.services.ResponseObjectService;
import com.revature.annotations.Authorized;
import com.revature.models.Post;
import com.revature.services.PostService;

@RestController
@RequestMapping("/post")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"}, allowCredentials = "true")
public class PostController {

	private final PostService postService;


    public PostController(PostService postService) {
        this.postService = postService;

    }
    
//    @Authorized
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
    	return ResponseEntity.ok(this.postService.getAll());
    }



    @Authorized
    @PutMapping
    public ResponseEntity<Post> upsertPost(@RequestBody Post post) {
    	return ResponseEntity.ok(this.postService.upsert(post));
    }



    @PostMapping("/likepost")
    public ResponseEntity<ResponseObjectService>likePost(@RequestBody Likes likesId){
        return new ResponseEntity<ResponseObjectService>(postService.updatePostByLike(likesId), HttpStatus.OK);
    }

}
