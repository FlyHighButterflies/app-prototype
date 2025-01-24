package com.flyhighbutterflies.payamonte.controller;

import com.flyhighbutterflies.payamonte.model.User;
import com.flyhighbutterflies.payamonte.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Create a new user or update an existing user
    @PostMapping
    public ResponseEntity<User> createOrUpdateUser(@RequestBody User user) {
        User createdOrUpdatedUser = userService.saveUser(user);
        return new ResponseEntity<>(createdOrUpdatedUser, HttpStatus.CREATED);
    }

    // Generate OTP for a user
    @PostMapping("/generate-otp")
    public ResponseEntity<String> generateOtp(@RequestBody User user) {
        try {
            String otp = userService.generateAndSaveOtp(user.getEmail());
            return new ResponseEntity<>("OTP generated successfully for " + user.getFirstName() + ". OTP: " + otp, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // Verify OTP
    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestBody User user) {
        boolean isValid = userService.verifyOtp(user.getEmail(), user.getOtpCode());
        if (isValid) {
            return new ResponseEntity<>("OTP verified successfully for " + user.getFirstName() + ".", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid or expired OTP.", HttpStatus.BAD_REQUEST);
        }
    }

    // Get all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // Get a user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") String id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update an existing user by ID
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") String id, @RequestBody User user) {
        Optional<User> existingUser = userService.getUserById(id);
        if (existingUser.isPresent()) {
            user.setUserId(id); // Set the id to ensure it's updated
            User updatedUser = userService.saveUser(user);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a user by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") String id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
