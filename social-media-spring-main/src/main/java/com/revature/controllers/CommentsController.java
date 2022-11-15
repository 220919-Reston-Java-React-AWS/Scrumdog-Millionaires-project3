package com.revature.controllers;

import com.revature.annotations.Authorized;
import com.revature.models.Comments;
import com.revature.services.CommentsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comments")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"}, allowCredentials = "true")
public class CommentsController {

    private final CommentsService commentsService;

    public CommentsController(CommentsService commentsService) {
        this.commentsService = commentsService;
    }


    @Authorized
    @PutMapping
    public ResponseEntity<Comments> upsertComment(@RequestBody Comments comment){
        return ResponseEntity.ok(this.commentsService.upsert(comment));
    }
}
