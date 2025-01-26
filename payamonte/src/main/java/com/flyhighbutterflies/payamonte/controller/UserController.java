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

    // Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.status(404).body(null);
    }

    // Update user
    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        String response = userService.updateUser(id, userDetails);
        if (response.equals("Profile updated successfully!")) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(404).body(response);
    }

    // Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        String response = userService.deleteUser(id);
        if (response.equals("User deleted successfully!")) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(404).body(response);
    }
}
