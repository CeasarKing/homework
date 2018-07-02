package com.lin.ui.controller.impl;

import com.lin.service.MessageService;
import com.lin.ui.controller.MessageController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@CrossOrigin(origins = {"http://192.168.1.102:3000","http://localhost:3000"},maxAge = 3600)
@RestController
public class MessageControllerImpl implements MessageController{

    private final MessageService messageService;
    @Autowired
    public MessageControllerImpl(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/msgs")
    @Override
    public Map<String, Object> getAllMessage() {
        return messageService.getAllMsg();
    }

}
