package com.example.demo.service;

import com.example.demo.model.Contact;
import com.example.demo.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    @Autowired
    ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

//    public Iterable<Contact> getAllContacts(){
//        return contactRepository.findAll();
//    }

    public void save(Contact invitation){
        contactRepository.save(invitation);
    }

    public Iterable<Contact> getAllContactsForSendee(String sendee)  {
        return contactRepository.findBySendee(sendee);
    }

    public Iterable<Contact> getAllContactsForSender(String sender)  {
        return contactRepository.findBySender(sender);
    }
}
