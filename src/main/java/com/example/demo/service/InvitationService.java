package com.example.demo.service;

import com.example.demo.model.Group;
import com.example.demo.model.Invitation;
import com.example.demo.repository.GroupRepository;
import com.example.demo.repository.InvitationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvitationService {

    @Autowired
    InvitationRepository invitationRepository;

    public InvitationService(InvitationRepository invitationRepository) {
        this.invitationRepository = invitationRepository;
    }

    public Iterable<Invitation> getAllInvitations(){
        return invitationRepository.findAll();
    }

    public void save(Invitation invitation){
        invitationRepository.save(invitation);
    }

    public Iterable<Invitation> getAllInvitationsForSendee(String sendee)  {
        return invitationRepository.findBySendee(sendee);
    }

    public Iterable<Invitation> getAllInvitationsForSender(String sender)  {
        return invitationRepository.findBySender(sender);
    }
}
