package com.example.crudbackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
public class HelloController {

    @CrossOrigin(origins = "http://localhost:3000")  // React 앱의 URL
    @GetMapping("/hello")
    public String hello() {
        return "Hello, Spring!";
    }
}