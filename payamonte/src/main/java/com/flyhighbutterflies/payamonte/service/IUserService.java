package com.flyhighbutterflies.payamonte.service;

import com.flyhighbutterflies.payamonte.model.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    String signUp(User user);
    String login(String email, String password); // Updated ,now it includes password
    String updateUser(Long userId, User userDetails);
    String deleteUser(Long userId);
    Optional<User> getUserById(Long userId);
    List<User> getAllUsers();
}
