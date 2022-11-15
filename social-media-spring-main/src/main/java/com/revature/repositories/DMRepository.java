package com.revature.repositories;

import com.revature.models.DM;
import com.revature.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DMRepository extends JpaRepository<DM, Integer> {

    List<DM> findBySender(User user);
}
