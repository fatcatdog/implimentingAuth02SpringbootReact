package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "invitation_table")
public class Contact {

    @JsonProperty
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @NotNull
    private Integer id;

    @JsonProperty
    @NotNull
    @Column(name = "sender")
    private String sender;

    @JsonProperty
    @NotNull
    @Column(name = "sendee")
    private String sendee;

    @JsonProperty
    @NotNull
    @Column(name = "date")
    private Date date = new Date();

}
