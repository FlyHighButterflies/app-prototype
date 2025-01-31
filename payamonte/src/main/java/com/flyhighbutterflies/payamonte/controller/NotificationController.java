package com.flyhighbutterflies.payamonte.controller;

import com.flyhighbutterflies.payamonte.model.Notification;
import com.flyhighbutterflies.payamonte.service.INotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private INotificationService notificationService;

    @PostMapping
    public Notification createNotification(@RequestBody Notification notification) {
        return notificationService.saveNotification(notification);
    }

    @GetMapping
    public List<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notification> getNotificationById(@PathVariable Long id) {
        Optional<Notification> notification = notificationService.getNotificationById(id);
        return notification.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<Notification> getNotificationsByUserId(@PathVariable Long userId) {
        return notificationService.getNotificationsByUserId(userId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Notification> updateNotification(@PathVariable Long id, @RequestBody Notification notificationDetails) {
        return notificationService.updateNotification(id, notificationDetails);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {
        notificationService.deleteNotification(id);
        return ResponseEntity.ok().build();
    }

    // for testing purposes
    @PostMapping("/trigger-recurring-reminder")
    public ResponseEntity<Void> triggerRecurringExpenseReminder() {
        notificationService.sendRecurringExpenseReminder();
        return ResponseEntity.ok().build();
    }
}
