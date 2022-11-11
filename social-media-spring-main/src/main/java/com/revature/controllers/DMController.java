package com.revature.controllers;

import com.revature.annotations.Authorized;
import com.revature.models.DM;
import com.revature.services.DMService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/message")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"}, allowCredentials = "true")
public class DMController {

    private final DMService dmService;

    public DMController(DMService dmService){ this.dmService = dmService; }

    @Authorized
    @PostMapping("/send/{receiver_id}")
    public ResponseEntity<DM> sendMessage(@RequestBody DM dm, @PathVariable int receiver_id) {
        return ResponseEntity.ok(this.dmService.send(dm));
    }
}
