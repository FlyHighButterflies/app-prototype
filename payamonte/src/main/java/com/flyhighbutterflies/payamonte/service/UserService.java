package com.flyhighbutterflies.payamonte.service;

import com.flyhighbutterflies.payamonte.model.User;
import com.flyhighbutterflies.payamonte.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Sign-Up (Register a new user)
    public String signUp(User user) {
        // Check if the email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Email already registered.";
        }

        // Set the creation timestamp
        user.setDatetimeCreated(LocalDateTime.now());
        userRepository.save(user);

        return "Sign-Up successful!";
    }

    // Login (Check if user exists and matches email)
    public String login(String email) {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {
            return "Login successful!";
        }

        return "Invalid email or user not found!";
    }

    // Profile Update (Update user details)
    public String updateUser(Long userId, User userDetails) {
        Optional<User> user = userRepository.findById(userId);

        if (user.isPresent()) {
            User existingUser = user.get();
            existingUser.setFirstName(userDetails.getFirstName());
            existingUser.setMiddleName(userDetails.getMiddleName());
            existingUser.setLastName(userDetails.getLastName());
            existingUser.setEmail(userDetails.getEmail());
            userRepository.save(existingUser);

            return "Profile updated successfully!";
        }

        return "User not found!";
    }
}
