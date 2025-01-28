package com.flyhighbutterflies.payamonte.service;

import com.flyhighbutterflies.payamonte.model.Notification;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

public interface INotificationService {
    Notification saveNotification(Notification notification);
    List<Notification> getAllNotifications();
    Optional<Notification> getNotificationById(Long id);
    ResponseEntity<Notification> updateNotification(Long id, Notification notificationDetails);
    void deleteNotification(Long id);
}
