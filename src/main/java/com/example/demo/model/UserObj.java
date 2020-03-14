package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "user_table")
public class UserObj {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    Integer id;

    @Column(unique = true)
    @NotNull
    String principalName;

    @Column
    @NotNull
    String email;

    @Column
    @NotNull
    String profilePicUrl;

    @Column
    @NotNull
    String name;

    public UserObj(){
        super();
    }

    public UserObj(String principalName, String email,  String profilePicUrl, String name) {
        super();
        this.principalName = principalName;
        this.email = email;
        this.profilePicUrl = profilePicUrl;
        this.name = name;
    }

    public UserObj(Integer id, String principalName, String email, String profilePicUrl, String name) {
        super();
        this.id = id;
        this.principalName = principalName;
        this.email = email;
        this.profilePicUrl = profilePicUrl;
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPrincipalName() {
        return principalName;
    }

    public void setPrincipalName(String principalName) {
        this.principalName = principalName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfilePicUrl() {
        return profilePicUrl;
    }

    public void setProfilePicUrl(String profilePicUrl) {
        this.profilePicUrl = profilePicUrl;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
