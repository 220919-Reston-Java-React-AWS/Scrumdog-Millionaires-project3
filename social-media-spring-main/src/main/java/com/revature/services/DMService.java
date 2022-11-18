package com.revature.services;

import com.revature.models.DM;
import com.revature.models.User;
import com.revature.repositories.DMRepository;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.stream.Collectors;

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

    public List<DM> getAllBetweenUsers(User user, HttpSession session) {
//        Filtering out all DMs by a sender to only show DMs sent to a certain user.
        return this.dmRepository.findBySender(user).stream().filter(DM -> DM.getReceiver() == (User) session.getAttribute("user")).collect(Collectors.toList());
    }
}
