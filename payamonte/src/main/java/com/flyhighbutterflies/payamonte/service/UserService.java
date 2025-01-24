package com.flyhighbutterflies.payamonte.service;

import com.flyhighbutterflies.payamonte.model.User;
import com.flyhighbutterflies.payamonte.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Create or Update a user
    public User saveUser(User user) {
        if (user.getDatetimeCreated() == null) {
            user.setDatetimeCreated(LocalDateTime.now());  // Set creation time if it's a new user
        }
        return userRepository.save(user);
    }

    // Generate and save OTP for a user
    public String generateAndSaveOtp(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Generate OTP
            String otp = String.format("%06d", new Random().nextInt(999999));
            user.setOtpCode(otp);
            user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));
            userRepository.save(user);

            return otp;
        } else {
            throw new RuntimeException("User not found");
        }
    }

    // Verify the OTP
    public boolean verifyOtp(String email, String otp) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return otp.equals(user.getOtpCode()) && LocalDateTime.now().isBefore(user.getOtpExpiry());
        }
        return false;
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get a user by ID
    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    // Delete a user by ID
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}
