package com.example.demo.repository;

import com.example.demo.model.Invitation;
import com.example.demo.model.UserObj;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvitationRepository extends CrudRepository<Invitation, Integer> {
    List<Invitation> findBySendee(String sendee);

}
