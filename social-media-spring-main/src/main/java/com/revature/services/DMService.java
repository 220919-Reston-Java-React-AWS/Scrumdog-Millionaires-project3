package com.revature.services;

import com.revature.models.DM;
import com.revature.models.User;
import com.revature.repositories.DMRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DMService {

    private DMRepository dmRepository;

    public DMService(DMRepository dmRepository){
        this.dmRepository = dmRepository;
    }

    public DM send(DM dm) { return this.dmRepository.save(dm);}

    public List<DM> getAllByUser(User user) {
        return this.dmRepository.findBySender(user);
    }
}
