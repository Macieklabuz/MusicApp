package com.labuz.musicapp.controllers;



import com.labuz.musicapp.auth.JwtService;
import com.labuz.musicapp.auth.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContentController {

  @Autowired
  private AuthenticationManager authenticationManager;
  @Autowired
  private JwtService jwtService;  @Autowired
  private UserDetailService myUserDetailService;

  @GetMapping("/home")
  public String handleWelcome() {
    return "Welcome to home!";
  }

  @GetMapping("/admin/home")
  public String handleAdminHome() {
    return "Welcome to ADMIN home!";
  }

  @GetMapping("/user/home")
  public String handleUserHome() {
    return "Welcome to USER home!";
  }

}
