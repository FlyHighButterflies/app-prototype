package com.flyhighbutterflies.payamonte.controller;

import com.flyhighbutterflies.payamonte.model.User;
import com.flyhighbutterflies.payamonte.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Sign-Up (Register a new user)
    @PostMapping("/sign-up")
    public ResponseEntity<String> signUp(@RequestBody User user) {
        String result = userService.signUp(user);
        if (result.equals("Sign-Up successful!")) {
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }

    // Login (Authenticate user)
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String email) {
        String result = userService.login(email);
        if (result.equals("Login successful!")) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(result, HttpStatus.UNAUTHORIZED);
    }

    // Profile Update (Update user details)
    @PutMapping("/{userId}")
    public ResponseEntity<String> updateUser(@PathVariable Long userId, @RequestBody User userDetails) {
        String result = userService.updateUser(userId, userDetails);
        if (result.equals("Profile updated successfully!")) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
    }
}
