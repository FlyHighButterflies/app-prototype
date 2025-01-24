package com.flyhighbutterflies.payamonte.service;

import com.flyhighbutterflies.payamonte.model.User;
import com.flyhighbutterflies.payamonte.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;

@Service
public class UserService implements IUserService {

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

    // Delete User (Remove user by ID)
    public String deleteUser(Long userId) {
        Optional<User> user = userRepository.findById(userId);

        if (user.isPresent()) {
            userRepository.deleteById(userId);
            return "User deleted successfully!";
        }

        return "User not found!";
    }

    // Get User Details (Retrieve user by ID)
    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    // Get All Users (Retrieve all users)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
