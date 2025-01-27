package com.flyhighbutterflies.payamonte.service;

import com.flyhighbutterflies.payamonte.model.User;
import com.flyhighbutterflies.payamonte.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;


@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepository;

    // Hash the password using SHA-256
    private String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] encodedHash = digest.digest(password.getBytes());
            StringBuilder hexString = new StringBuilder();
            for (byte b : encodedHash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }

    // Sign-Up (Register a new user)
    public String signUp(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Email already registered.";
        }

        // Hash the password
        user.setPassword(hashPassword(user.getPassword()));

        // Set the creation timestamp
        user.setDatetimeCreated(LocalDateTime.now());
        userRepository.save(user);

        return "Sign-Up successful!";
    }

    // Login (Check if user exists and verify password)
    public String login(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {
            // Compare hashed passwords
            String hashedPassword = hashPassword(password);
            if (hashedPassword.equals(user.get().getPassword())) {
                return "Login successful!";
            }
            return "Invalid password!";
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
