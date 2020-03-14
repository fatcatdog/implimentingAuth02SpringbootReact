package com.example.demo.service;

import com.example.demo.model.Group;
import com.example.demo.model.UserObj;
import com.example.demo.repository.GroupRepository;
import com.example.demo.repository.UserObjRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserObjService {

    @Autowired
    private UserObjRepository userObjRepository;

    public UserObjService(UserObjRepository userObjRepository) {
        this.userObjRepository = userObjRepository;
    }

    public Iterable<UserObj> getAllUserObjs(){
        return userObjRepository.findAll();
    }

    @Transactional
    public void saveUser(OAuth2User user) {

        try {
            Optional<UserObj> temp = userObjRepository.findByPrincipalName(user.getName());

            boolean isUserObjInDb = temp.isPresent();

            if(isUserObjInDb) {
                return;
            }

            UserObj tempUser = new UserObj();
            //Google login
            if(user.getAttribute("repos_url") == null) {
                tempUser.setEmail(user.getAttribute("email"));
                tempUser.setName(user.getAttribute("name"));
                tempUser.setPrincipalName(user.getName());
                tempUser.setProfilePicUrl(user.getAttribute("picture"));
            } else {
            //github login
                String tempEmail = user.getAttribute("email");
                if(tempEmail == null) {
                    tempUser.setEmail("no@email.com");
                } else {
                    tempUser.setEmail(user.getAttribute("email"));
                }

                tempUser.setName(user.getAttribute("name"));
                tempUser.setPrincipalName(user.getName());
                tempUser.setProfilePicUrl(user.getAttribute("avatar_url"));
            }

                userObjRepository.save(tempUser);

            } catch(Exception e) {
                System.out.println("Failed saving user in UserObjService DOPE!");
                System.out.println(e);
            }
    }
}
