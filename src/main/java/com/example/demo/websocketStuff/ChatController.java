package com.example.demo.websocketStuff;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {


    /*-------------------- Group (Public) chat--------------------*/
    @MessageMapping("/sendMessage")
    @SendTo("/topic/pubic")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        System.out.println("ChatController sendMessage");
        System.out.println(chatMessage.toString());
        return chatMessage;
    }

    @MessageMapping("/addUser")
    @SendTo("/topic/pubic")
    public ChatMessage addUser(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        // Add user in web socket session

        System.out.println("ChatController addUser");
        System.out.println(chatMessage.toString());

        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        return chatMessage;
    }


    /*--------------------Private chat--------------------*/
//    @Autowired
//    private SimpMessagingTemplate simpMessagingTemplate;
//
//    @MessageMapping("/sendPrivateMessage")
//    //@SendTo("/queue/reply")
//    public void sendPrivateMessage(@Payload ChatMessage chatMessage) {
//
//        System.out.println("ChatController sendPrivateMessage");
//        System.out.println(chatMessage.toString());
//
//        simpMessagingTemplate.convertAndSendToUser(
//                chatMessage.getReceiver().trim(), "/reply", chatMessage);
//        //return chatMessage;
//    }
//
//    @MessageMapping("/addPrivateUser")
//    @SendTo("/queue/reply")
//    public ChatMessage addPrivateUser(@Payload ChatMessage chatMessage,
//                                      SimpMessageHeaderAccessor headerAccessor) {
//        // Add user in web socket session
//
//        System.out.println("ChatController addPrivateUser");
//        System.out.println(chatMessage.toString());
//
//        headerAccessor.getSessionAttributes().put("private-username", chatMessage.getSender());
//        return chatMessage;
//    }
}