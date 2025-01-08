package com.flyhighbutterflies.payamonte.model;

import jakarta.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
public class Expense {
    // Auto-generate ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    // Fields
    private Long id;
    @NotNull(message = "Category is required")
    @Column(nullable = false)
    private String category;

    private String description;

    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be positive")
    @Column(nullable = false)
    private BigDecimal amount;

    @NotNull(message = "Date is required")
    @Column(nullable = false)
    private LocalDate date;

    // Constructors
    public Expense() {}

    public Expense(String category, String description, BigDecimal amount, LocalDate date) {
        this.category = category;
        this.description = description;
        this.amount = amount;
        this.date = date;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Category getters and setters
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    // Description getters and setters
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // Amount getters and setters
    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    // Date getters and setters
    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
