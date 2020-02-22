package com.example.demo.service;

import com.example.demo.model.Group;
import com.example.demo.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GroupService {

    @Autowired
    private GroupRepository groupRepository;

    public GroupService(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    public Iterable<Group> getAllGroups(){
        return groupRepository.findAll();
    }

    public void save(Group group){
        groupRepository.save(group);
    }

    public void delete(Group group){
        groupRepository.delete(group);
    }

    public Optional<Group> getGroupById(Integer id) {
        return groupRepository.findById(id);
    }
}
