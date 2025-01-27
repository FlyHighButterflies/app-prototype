package com.flyhighbutterflies.payamonte.service;

import com.flyhighbutterflies.payamonte.model.Notification;
import com.flyhighbutterflies.payamonte.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService implements INotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public Notification saveNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    @Override
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    @Override
    public Optional<Notification> getNotificationById(Long id) {
        return notificationRepository.findById(id);
    }

    @Override
    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }

    @Override
    public ResponseEntity<Notification> updateNotification(Long id, Notification notificationDetails) {
        Optional<Notification> notification = notificationRepository.findById(id);
        if (notification.isPresent()) {
            Notification updatedNotification = notification.get();
            updatedNotification.setTitle(notificationDetails.getTitle());
            updatedNotification.setMessage(notificationDetails.getMessage());
            updatedNotification.setPush_notification(notificationDetails.isPush_notification());
            updatedNotification.setIn_app_notification(notificationDetails.isIn_app_notification());
            updatedNotification.setDate(notificationDetails.getDate());
            updatedNotification.setUser(notificationDetails.getUser());
            return ResponseEntity.ok(notificationRepository.save(updatedNotification));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
