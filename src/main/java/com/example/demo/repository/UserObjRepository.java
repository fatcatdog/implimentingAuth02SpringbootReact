package com.example.demo.repository;

import com.example.demo.model.Group;
import com.example.demo.model.UserObj;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserObjRepository extends CrudRepository<UserObj, Integer> {
    Optional<UserObj> findByPrincipalName(String principalName);
    Optional<UserObj> findByName(String name);

}
