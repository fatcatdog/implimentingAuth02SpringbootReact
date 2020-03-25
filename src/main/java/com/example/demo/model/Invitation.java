package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

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
    @Column(name = "accepted")
    private String accepted;

    public Invitation(@NotNull Integer id, @NotNull String sender, @NotNull String sendee, @NotNull String accepted) {
        this.id = id;
        this.sender = sender;
        this.sendee = sendee;
        this.accepted = accepted;
    }

    public Invitation(@NotNull String sender, @NotNull String sendee, @NotNull String accepted) {
        this.sender = sender;
        this.sendee = sendee;
        this.accepted = accepted;
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

    public String getAccepted() {
        return accepted;
    }

    public void setAccepted(String accepted) {
        this.accepted = accepted;
    }

    @Override
    public String toString() {
        return "Invitation{" +
                "id=" + id +
                ", sender='" + sender + '\'' +
                ", sendee='" + sendee + '\'' +
                ", accepted='" + accepted + '\'' +
                '}';
    }
}
