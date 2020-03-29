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

    public Contact(@NotNull Integer id, @NotNull String sender, @NotNull String sendee, @NotNull Date date) {
        super();
        this.id = id;
        this.sender = sender;
        this.sendee = sendee;
        this.date = date;
    }

    public Contact(@NotNull String sender, @NotNull String sendee) {
        super();
        this.sender = sender;
        this.sendee = sendee;
        this.date = date;
    }

    public Contact() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getSendee() {
        return sendee;
    }

    public void setSendee(String sendee) {
        this.sendee = sendee;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
