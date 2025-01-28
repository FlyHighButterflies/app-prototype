package com.flyhighbutterflies.payamonte.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDate;

@Entity
@Table(name = "notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Long notificationId;

    @Column(name = "title", length = 128, nullable = false)
    private String title;

    @Column(name = "message", length = 1024, nullable = false)
    private String message;

    @Column(name = "push_notification", nullable = false)
    private boolean push_notification;

    @Column(name = "in_app_notification", nullable = false)
    private boolean in_app_notification;
    
    @Column(name = "datetime_updated", nullable = false)
    private LocalDate date;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"firstName", "middleName", "lastName", "email", "datetimeCreated", "expenses", "budgets", "notifications"})
    private User user;

    // Constructors
    public Notification() {}

    public Notification(String title, String message, boolean push_notification, boolean in_app_notification, LocalDate date, User user) {
        this.title = title;
        this.message = message;
        this.push_notification = push_notification;
        this.in_app_notification = in_app_notification;
        this.date = date;
        this.user = user;
    }

    // Getters and Setters
    public Long getNotificationId() {
        return notificationId;
    }

    public void setNotificationId(Long notificationId) {
        this.notificationId = notificationId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isPush_notification() {
        return push_notification;
    }

    public void setPush_notification(boolean push_notification) {
        this.push_notification = push_notification;
    }

    public boolean isIn_app_notification() {
        return in_app_notification;
    }

    public void setIn_app_notification(boolean in_app_notification) {
        this.in_app_notification = in_app_notification;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
