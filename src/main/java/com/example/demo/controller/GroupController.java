package com.example.demo.controller;

import com.example.demo.model.Group;
import com.example.demo.service.GroupService;
//import io.swagger.annotations.Api;
//import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Api;
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
import java.net.URISyntaxException;

@Api(value="Group REST API ")
@Controller
@RequestMapping(path="/api")
public class GroupController {

    private static final Logger logger = LoggerFactory.getLogger(GroupController.class);

    @Autowired
    private GroupService groupService;

//    @ApiOperation(value = "Add a Group")
    @CrossOrigin(origins = "*")
    @PostMapping(path="/addGroup", produces = "application/json; charset=UTF-8")
    public ResponseEntity<?> addNewGroup (@Valid @RequestBody Group group, @AuthenticationPrincipal OAuth2User principal) {
        System.out.println("GroupController - addNewGroup..........");

        try {
            groupService.save(group);
            logger.info("GroupController - addNewGroup: " + group);
            return new ResponseEntity<>(HttpStatus.OK) ;
        } catch (Exception e) {
            logger.error("GroupController - addNewGroup: " + e);
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

//    @ApiOperation(value = "Get all groups")
    @CrossOrigin(origins = "*")
    @GetMapping(path = "/groups",  produces = "application/json; charset=UTF-8")
    public ResponseEntity<?> getAllTasks() {

        try {
            Iterable<Group> tempGroups = groupService.getAllGroups();
            logger.info("GroupController - getAllTasks: " + tempGroups);
            return new ResponseEntity<>(tempGroups, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            logger.error("GroupController - getAllTasks: " + e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }



}
