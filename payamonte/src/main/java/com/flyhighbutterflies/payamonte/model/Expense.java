package com.flyhighbutterflies.payamonte.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category;
    private String description;
    private BigDecimal amount;
    private LocalDate date;

    // Getters and Setters
}
