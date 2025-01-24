package com.flyhighbutterflies.payamonte.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")  // Table name in the database
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  
    @Column(name = "user_id", length = 16)  
    private Long userId;  

    @Column(name = "first_name", length = 128, nullable = false)
    private String firstName;

    @Column(name = "middle_name", length = 128)
    private String middleName;

    @Column(name = "last_name", length = 128, nullable = false)
    private String lastName;

    @Column(name = "email", length = 32, unique = true, nullable = false)
    private String email;

    @Column(name = "datetime_created", nullable = false)
    private LocalDateTime datetimeCreated;

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getDatetimeCreated() {
        return datetimeCreated;
    }

    public void setDatetimeCreated(LocalDateTime datetimeCreated) {
        this.datetimeCreated = datetimeCreated;
    }
}
