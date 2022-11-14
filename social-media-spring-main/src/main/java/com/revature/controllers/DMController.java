package com.revature.controllers;

import com.revature.annotations.Authorized;
import com.revature.models.DM;
import com.revature.models.User;
import com.revature.services.DMService;
import com.revature.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/message")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"}, allowCredentials = "true")
public class DMController {

    private final DMService dmService;

    private final UserService userService;

    public DMController(DMService dmService, UserService userService){
        this.dmService = dmService;
        this.userService = userService;
    }

    @Authorized
    @PostMapping("/send/{receiver_id}")
    public ResponseEntity<DM> sendMessage(@RequestBody DM dm, @PathVariable("receiver_id") int id) {
        Optional<User> optional = userService.findById(id);

        if(optional.isEmpty()){
            return ResponseEntity.badRequest().build();
        }
        else {
            return ResponseEntity.ok(this.dmService.send(dm));
        }
    }

    @Authorized
    @GetMapping("/receive/{sender_id}")
    public ResponseEntity<List<DM>> getMessagesByUser(@PathVariable int sender_id, HttpSession httpSession) {
        Optional<User> optional = userService.findById(sender_id);
        if(optional.isEmpty()){
            return ResponseEntity.badRequest().build();
        }
        else {
            User user = optional.get();
            httpSession.setAttribute("user", optional.get());

            return ResponseEntity.ok(this.dmService.getAllByUser(user));
        }
    }
}
