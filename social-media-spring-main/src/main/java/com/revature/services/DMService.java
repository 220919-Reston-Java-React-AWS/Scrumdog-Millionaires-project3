package com.revature.services;

import com.revature.models.DM;
import com.revature.models.User;
import com.revature.repositories.DMRepository;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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

    public List<DM> getAllBetweenUsers(User user1, User user2) {
//        Using Stream API to make a list of DMs sent by two users and combining them into one list as well as sorting them by ID.
        List<DM> dmList1 = this.dmRepository.findBySender(user1);
        List<DM> dmList2 = this.dmRepository.findBySender(user2);
        List<DM> dmList = Stream.concat(dmList1.stream(), dmList2.stream()).sorted(Comparator.comparingInt(DM::getId)).collect(Collectors.toList());

//        Filtering out the list to only show DMs sent between each other.
        return dmList.stream().filter(DM -> DM.getReceiver().equals(user2) || DM.getReceiver().equals(user1)).collect(Collectors.toList());
    }
}
