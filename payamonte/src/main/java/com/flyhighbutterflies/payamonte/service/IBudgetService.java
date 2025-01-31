package com.flyhighbutterflies.payamonte.service;

import com.flyhighbutterflies.payamonte.model.Budget;

import java.util.List;

public interface IBudgetService {
    List<Budget> getAllBudgets();
    Budget getBudgetById(Long id);
    Budget createBudget(Budget budget);
    Budget updateBudget(Long id, Budget budgetDetails);
    void updateBudgetExpenses(Budget budget);
    void deleteBudget(Long id);
    Double getRemainingBalance(Long userId);
}
