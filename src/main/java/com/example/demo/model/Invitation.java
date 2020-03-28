package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "invitation_table")
public class Invitation {

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
    @Column(name = "status")
    private boolean status;

    @JsonProperty
    @NotNull
    @Column(name = "dateTime")
    private LocalDateTime dateTime=LocalDateTime.now();;

    public Invitation(@NotNull Integer id, @NotNull String sender, @NotNull String sendee, @NotNull boolean status, @NotNull LocalDateTime dateTime) {
        super();
        this.id = id;
        this.sender = sender;
        this.sendee = sendee;
        this.status = status;
        this.dateTime = dateTime;
    }

    public Invitation(@NotNull String sender, @NotNull String sendee) {
        super();
        this.sender = sender;
        this.sendee = sendee;
        this.status = false;
        this.dateTime = dateTime;
    }

    public Invitation() {
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

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }
}
