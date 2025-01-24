package com.flyhighbutterflies.payamonte.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "User")
public class User {

    @Id
    @Column(name = "user_id", length = 16)
    private String userId;

    @Column(name = "firstname", length = 128, nullable = false)
    private String firstName;

    @Column(name = "middlename", length = 128)
    private String middleName;

    @Column(name = "lastname", length = 128, nullable = false)
    private String lastName;

    @Column(name = "email", length = 32, unique = true, nullable = false)
    private String email;

    @Column(name = "datetime_created", nullable = false)
    private LocalDateTime datetimeCreated;

    @Column(name = "otp_code", length = 6)
    private String otpCode; // OTP for authentication.

    @Column(name = "otp_expiry")
    private LocalDateTime otpExpiry; // Expiration time for OTP.

    // Getters and setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
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

    public String getOtpCode() {
        return otpCode;
    }

    public void setOtpCode(String otpCode) {
        this.otpCode = otpCode;
    }

    public LocalDateTime getOtpExpiry() {
        return otpExpiry;
    }

    public void setOtpExpiry(LocalDateTime otpExpiry) {
        this.otpExpiry = otpExpiry;
    }
}
