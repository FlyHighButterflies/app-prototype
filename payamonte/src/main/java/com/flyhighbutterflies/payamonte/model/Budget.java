package com.flyhighbutterflies.payamonte.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "budget")
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "budget_id")
    private Long id;
    
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"firstName", "middleName", "lastName", "email", "datetimeCreated", "expenses", "budgets, notifications"})
    private User user;

    @Column(name = "total_balance")
    private Double totalBalance;

    @Column(name = "total_expense")
    private Double totalExpense;

    @Column(name = "datetime_updated")
    private LocalDateTime datetimeUpdated;

    // Constructors
    public Budget() {}

    public Budget(Double totalBalance, Double totalExpense, LocalDateTime datetimeUpdated, User user) {
        this.totalBalance = totalBalance;
        this.totalExpense = totalExpense;
        this.datetimeUpdated = datetimeUpdated;
        this.user = user;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getTotalBalance() {
        return totalBalance;
    }

    public void setTotalBalance(Double totalBalance) {
        this.totalBalance = totalBalance;
    }

    public Double getTotalExpense() {
        return totalExpense;
    }

    public void setTotalExpense(Double totalExpense) {
        this.totalExpense = totalExpense;
    }

    public LocalDateTime getDatetimeUpdated() {
        return datetimeUpdated;
    }

    public void setDatetimeUpdated(LocalDateTime datetimeUpdated) {
        this.datetimeUpdated = datetimeUpdated;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
