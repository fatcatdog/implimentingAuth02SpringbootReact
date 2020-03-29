package com.example.demo.controller;

import com.example.demo.model.Contact;
import com.example.demo.service.ContactService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Api(value="Contact REST API ")
@Controller
@RequestMapping(path="/api")
public class ContactController {

    private static final Logger logger = LoggerFactory.getLogger(ContactController.class);

    @Autowired
    private ContactService contactService;

    @ApiOperation(value = "Create a contact")
    @CrossOrigin(origins = "*")
    @PostMapping(path="/contacts/add", produces = "application/json; charset=UTF-8")
    public ResponseEntity<?> sendNewContact (@Valid @RequestBody Contact contact) {
        System.out.println("ContactController - addNewContact..........");

        try {
            contactService.save(contact);
            logger.info("ContactController - addNewContact: " + contact);
            return new ResponseEntity<>(HttpStatus.OK) ;
        } catch (Exception e) {
            logger.error("ContactController - addNewContact: " + e);
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "Get all contacts for sendee")
    @CrossOrigin(origins = "*")
    @GetMapping(path = "/contacts/sendee/{contactSendee}",  produces = "application/json; charset=UTF-8")
    public ResponseEntity<?> getContactsForSendee(@PathVariable(name="contactSendee") String contactSendee) {

        try {
            Iterable<Contact> tempContacts = contactService.getAllContactsForSendee(contactSendee);
            logger.info("ContactController - getContactsForSendee: " + tempContacts);
            return new ResponseEntity<>(tempContacts, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            logger.error("ContactController - getContactsForSendee: " + e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "Get all contacts for sender")
    @CrossOrigin(origins = "*")
    @GetMapping(path = "/contacts/sender/{contactSender}",  produces = "application/json; charset=UTF-8")
    public ResponseEntity<?> getContactsForSender(@PathVariable(name="contactSender") String contactSender) {

        try {
            Iterable<Contact> tempContacts = contactService.getAllContactsForSender(contactSender);
            logger.info("ContactController - getContactsForSender: " + tempContacts);
            return new ResponseEntity<>(tempContacts, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            logger.error("ContactController - getContactsForSender: " + e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
