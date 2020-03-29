package com.example.demo.controller;

import com.example.demo.service.UserObjService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(path="/api")
public class UserController {

//    @GetMapping("/api/login")
//    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
//        return Collections.singletonMap("name", principal.getAttribute("name"));
//    }

    @Autowired
    UserObjService userObjService;

//    private ClientRegistration registration;
//
//    public UserController(ClientRegistrationRepository registrations) {
//        if(registrations.findByRegistrationId("github") != null){
//            this.registration = registrations.findByRegistrationId("github");
//        } else {
//            this.registration = registrations.findByRegistrationId("google");
//        }
//    }

    @CrossOrigin(origins = "*")
    @ApiOperation(value = "Check if user principal is valid")
    @GetMapping(path = "/user/{name}",  produces = "application/json; charset=UTF-8")
    public ResponseEntity<?> checkIfRealUser(@PathVariable(name="name") String name) {
        System.out.println("Check if user principal is valid!!!!!!");

        try {
            String userPresentPicUrl = userObjService.checkIfUserExists(name);

            if(userPresentPicUrl.equals("User not found")) {
                return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
            } else {
                return new ResponseEntity<>(userPresentPicUrl, HttpStatus.OK);
            }

        } catch (Exception e) {
            System.out.println(e);
        }
        return new ResponseEntity<>("Something went wrong trying to get user obj", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ApiOperation(value = "Get User + save user")
    @GetMapping("/user")
    public ResponseEntity<?> getUser(@AuthenticationPrincipal OAuth2User user) {

        if (user == null) {
            return new ResponseEntity<>("Something went wrong in /api/user?", HttpStatus.BAD_REQUEST);
        } else {
            userObjService.saveUser(user);
            return new ResponseEntity<>(user.getAttributes(), HttpStatus.OK);
        }

    }

    @ApiOperation(value = "Logout user")
    @PostMapping("/api/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        System.out.println("We are hitting our logout endpoint !!!!!!!");
        try {
            request.logout();
//            request.getSession().invalidate();

            return new ResponseEntity<>("You logged out", HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e);
            return new ResponseEntity<>("You did not log out", HttpStatus.BAD_REQUEST);
        }
    }

    //okta implimentation
//    @PostMapping("/api/logout")
//    public ResponseEntity<?> logout(HttpServletRequest request, @AuthenticationPrincipal(expression = "idToken") OidcIdToken idToken) {
//
//        // send logout URL to client so they can initiate logout
//        String logoutUrl = this.registration.getProviderDetails()
//                .getConfigurationMetadata().get("end_session_endpoint").toString();
//
//        Map<String, String> logoutDetails = new HashMap<>();
//        logoutDetails.put("logoutUrl", logoutUrl);
//        logoutDetails.put("idToken", idToken.getTokenValue());
//        request.getSession(false).invalidate();
//        return ResponseEntity.ok().body(logoutDetails);
//    }
}
