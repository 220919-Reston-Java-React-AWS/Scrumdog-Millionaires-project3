package com.revature.controllers;

import java.util.List;
import java.util.Optional;

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

import com.revature.repositories.PostRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.revature.services.ResponseObjectService;
import com.revature.annotations.Authorized;
import com.revature.models.Post;
import com.revature.services.PostService;

@RestController
@RequestMapping("/post")
@CrossOrigin(origins =  "http://travelogfe.s3-website-us-east-1.amazonaws.com/", allowCredentials = "true")
public class PostController {

	private final PostService postService;



    private final PostRepository postRepository;

    public PostController(PostService postService, PostRepository postRepository) {
        this.postService = postService;
        this.postRepository = postRepository;

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

    @DeleteMapping("/{id}")
    void deletePost(@PathVariable int id){
        this.postRepository.deleteById(id);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable("id") int id, @RequestBody Post post) {
        return ResponseEntity.ok(this.postService.updatePost(post, id));
    }

}
