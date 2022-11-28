package com.revature.controllers;

import com.revature.annotations.Authorized;
import com.revature.models.DM;
import com.revature.models.User;
import com.revature.services.DMService;
import com.revature.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/message")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class DMController {

    private final DMService dmService;

    private final UserService userService;

    @Autowired
    private final HttpSession session;

    public DMController(DMService dmService, UserService userService, HttpSession session){
        this.dmService = dmService;
        this.userService = userService;
        this.session = session;
    }

    @Authorized
    @PostMapping("/send/{receiver_id}")
    public ResponseEntity<DM> sendMessage(@RequestBody DM dm, @PathVariable("receiver_id") int id) {

        Optional<User> receiver = userService.findById(id);
//        Setting the sender as the user that is logged in.
        User sender = (User) session.getAttribute("user");
        dm.setSender(sender);

//        Checking to see if the other user exists.
        if(receiver.isEmpty()){
            return ResponseEntity.badRequest().build();
        }
        else {
//        Setting the receiver as the other user.
            dm.setReceiver(receiver.get());
            return ResponseEntity.ok(this.dmService.send(dm));
        }
    }

    @Authorized
    @GetMapping("/received/{sender_id}")
    public ResponseEntity<List<DM>> getMessagesByUser(@PathVariable int sender_id) {

//        Setting the receiver as the user that is logged in.
        Optional<User> optionalSender = userService.findById(sender_id);
        User receiver = (User) session.getAttribute("user");

//        Checking to see if the other user exists.
        if(optionalSender.isEmpty()){
            return ResponseEntity.badRequest().build();
        }
        else {

//        Setting the sender as the other user.
            User sender = optionalSender.get();


            return ResponseEntity.ok(this.dmService.getAllBetweenUsers(sender, receiver));
        }
    }

}
