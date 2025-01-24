package com.flyhighbutterflies.payamonte.repository;

import com.flyhighbutterflies.payamonte.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByEmail(String email); // Find user by email.
}
