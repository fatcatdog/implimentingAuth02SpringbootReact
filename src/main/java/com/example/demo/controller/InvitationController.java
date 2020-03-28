package com.example.demo.controller;

import com.example.demo.model.Group;
import com.example.demo.model.Invitation;
import com.example.demo.service.GroupService;
import com.example.demo.service.InvitationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Api(value="Invitation REST API ")
@Controller
@RequestMapping(path="/api")
public class InvitationController {

    private static final Logger logger = LoggerFactory.getLogger(InvitationController.class);

    @Autowired
    private InvitationService invitationService;

    @ApiOperation(value = "Create an invitation")
    @CrossOrigin(origins = "*")
    @PostMapping(path="/invitations/add", produces = "application/json; charset=UTF-8")
    public ResponseEntity<?> addNewInvitation (@Valid @RequestBody Invitation invitation) {
        System.out.println("InvitationController - addNewInvitation..........");

        try {
            invitationService.save(invitation);
            logger.info("InvitationController - addNewInvitation: " + invitation);
            return new ResponseEntity<>(HttpStatus.OK) ;
        } catch (Exception e) {
            logger.error("InvitationController - addNewInvitation: " + e);
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "Get all invitations for sendee")
    @CrossOrigin(origins = "*")
    @GetMapping(path = "/invitations/sendee/{invitationSendee}",  produces = "application/json; charset=UTF-8")
    public ResponseEntity<?> getInvitationsForSendee(@PathVariable(name="invitationSendee") String invitationSendee) {

        try {
            Iterable<Invitation> tempInvitations = invitationService.getAllInvitationsForSendee(invitationSendee);
            logger.info("InvitationController - getInvitationsForSendee: " + tempInvitations);
            return new ResponseEntity<>(tempInvitations, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            logger.error("InvitationController - getInvitationsForSendee: " + e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "Get all invitations for sender")
    @CrossOrigin(origins = "*")
    @GetMapping(path = "/invitations/sender/{invitationSender}",  produces = "application/json; charset=UTF-8")
    public ResponseEntity<?> getInvitationsForSender(@PathVariable(name="invitationSender") String invitationSender) {

        try {
            Iterable<Invitation> tempInvitations = invitationService.getAllInvitationsForSender(invitationSender);
            logger.info("InvitationController - getInvitationsForSender: " + tempInvitations);
            return new ResponseEntity<>(tempInvitations, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            logger.error("InvitationController - getInvitationsForSender: " + e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "Update an invitation")
    @CrossOrigin(origins = "*")
    @PostMapping(path="/invitations/update", produces = "application/json; charset=UTF-8")
    public ResponseEntity<?> updateInvitation (@Valid @RequestBody Invitation invitation) {
        System.out.println("InvitationController - updateInvitation..........");

        try {
            invitationService.save(invitation);
            logger.info("InvitationController - updateInvitation: " + invitation);
            return new ResponseEntity<>(HttpStatus.OK) ;
        } catch (Exception e) {
            logger.error("InvitationController - updateInvitation: " + e);
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
