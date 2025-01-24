package com.flyhighbutterflies.payamonte.service;

import com.flyhighbutterflies.payamonte.model.Expense;

import java.util.List;
import java.util.Optional;

public interface IExpenseService {
    Expense saveExpense(Expense expense);
    List<Expense> getAllExpenses();
    Optional<Expense> getExpenseById(Long id);
    void deleteExpense(Long id);
}
