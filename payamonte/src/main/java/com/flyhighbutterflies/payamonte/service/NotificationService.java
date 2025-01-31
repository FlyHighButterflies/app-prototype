package com.flyhighbutterflies.payamonte.service;

import com.flyhighbutterflies.payamonte.model.Notification;
import com.flyhighbutterflies.payamonte.repository.NotificationRepository;
import com.flyhighbutterflies.payamonte.model.User;
import com.flyhighbutterflies.payamonte.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationService implements INotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

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
    public List<Notification> getNotificationsByUserId(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return notificationRepository.findByUser(user.get());
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @Override
    @Scheduled(cron = "0 0 8 * * ?")
    public void sendRecurringNotifications() {
        
    }

    @Override
    @Scheduled(cron = "0 0 20 * * ?")
    public void sendExpenseTrackingReminder() {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            Notification notification = new Notification(
                "Expense Tracking Reminder",
                "Please remember to track your expenses before the day ends.",
                true,
                true,
                LocalDate.now(),
                user
            );
            notificationRepository.save(notification);
        }
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
