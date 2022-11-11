package com.revature.services;

import com.revature.models.DM;
import com.revature.repositories.DMRepository;
import org.springframework.stereotype.Service;

@Service
public class DMService {

    private DMRepository dmRepository;

    public DMService(DMRepository dmRepository){
        this.dmRepository = dmRepository;
    }

    public DM send(DM dm) { return this.dmRepository.save(dm);}
}
