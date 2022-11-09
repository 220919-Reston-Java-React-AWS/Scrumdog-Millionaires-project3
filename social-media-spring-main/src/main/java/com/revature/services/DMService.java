package com.revature.services;

import com.revature.repositories.DMRepository;
import org.springframework.stereotype.Service;

@Service
public class DMService {

    private DMRepository dmRepository;

    public DMService(DMRepository dmRepository){
        this.dmRepository = dmRepository;
    }
}
