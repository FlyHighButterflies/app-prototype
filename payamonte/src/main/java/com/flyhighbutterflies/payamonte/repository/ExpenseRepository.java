package com.flyhighbutterflies.payamonte.repository;

import com.flyhighbutterflies.payamonte.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}
