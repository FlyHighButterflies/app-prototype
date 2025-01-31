package com.flyhighbutterflies.payamonte.service;

import com.flyhighbutterflies.payamonte.model.Expense;
import com.flyhighbutterflies.payamonte.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ExpenseService implements IExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Override
    public Expense saveExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    @Override
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    @Override
    public Optional<Expense> getExpenseById(Long id) {
        return expenseRepository.findById(id);
    }

    @Override
    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }

    @Override
    public void createRecurringExpense(Expense expense, String frequency) {
        List<Expense> recurringExpenses = new ArrayList<>();
        LocalDate startDate = expense.getDate();
        LocalDate endDate = startDate.plusYears(1); // Example: create recurring expenses for one year

        while (startDate.isBefore(endDate)) {
            Expense newExpense = new Expense(
                expense.getAmount(),
                expense.getCategory(),
                startDate,
                expense.getDescription(),
                expense.getUser()
            );
            newExpense.setIsRecurring(true);
            newExpense.setFrequency(frequency);
            recurringExpenses.add(newExpense);

            switch (frequency.toLowerCase()) {
                case "daily":
                    startDate = startDate.plusDays(1);
                    break;
                case "weekly":
                    startDate = startDate.plusWeeks(1);
                    break;
                case "monthly":
                    startDate = startDate.plusMonths(1);
                    break;
                default:
                    throw new IllegalArgumentException("Invalid frequency: " + frequency);
            }
        }

        expenseRepository.saveAll(recurringExpenses);
    }

    @Override
    public void deleteRecurringExpense(Long id) {
        Optional<Expense> expense = expenseRepository.findById(id);
        if (expense.isPresent() && expense.get().isRecurring()) {
            // Logic to delete all recurring instances of the expense
            List<Expense> recurringExpenses = expenseRepository.findAll().stream()
                    .filter(e -> e.getUser().equals(expense.get().getUser()) &&
                                 e.getCategory().equals(expense.get().getCategory()) &&
                                 e.getDescription().equals(expense.get().getDescription()) &&
                                 e.isRecurring() &&
                                 e.getFrequency().equals(expense.get().getFrequency()))
                    .collect(Collectors.toList());
            expenseRepository.deleteAll(recurringExpenses);
        } else {
            expenseRepository.deleteById(id);
        }
    }

    @Override
    public List<Expense> getRecurringExpenses() {
        return expenseRepository.findAll().stream()
                .filter(expense -> Boolean.TRUE.equals(expense.isRecurring()))
                .collect(Collectors.toList());
    }

    @Override
    public void updateRecurringExpense(Long id, Expense updatedExpense) {
        Optional<Expense> existingExpense = expenseRepository.findById(id);
        if (existingExpense.isPresent() && existingExpense.get().isRecurring()) {
            List<Expense> recurringExpenses = expenseRepository.findAll().stream()
                    .filter(e -> e.getUser().equals(existingExpense.get().getUser()) &&
                                 e.getCategory().equals(existingExpense.get().getCategory()) &&
                                 e.getDescription().equals(existingExpense.get().getDescription()) &&
                                 e.isRecurring() &&
                                 e.getFrequency().equals(existingExpense.get().getFrequency()))
                    .collect(Collectors.toList());

            LocalDate startDate = updatedExpense.getDate();
            LocalDate endDate = startDate.plusYears(1); // Example: update recurring expenses for one year

            for (Expense expense : recurringExpenses) {
                expense.setAmount(updatedExpense.getAmount());
                expense.setCategory(updatedExpense.getCategory());
                expense.setDescription(updatedExpense.getDescription());
                expense.setUser(updatedExpense.getUser());

                switch (updatedExpense.getFrequency().toLowerCase()) {
                    case "daily":
                        expense.setDate(startDate);
                        startDate = startDate.plusDays(1);
                        break;
                    case "weekly":
                        expense.setDate(startDate);
                        startDate = startDate.plusWeeks(1);
                        break;
                    case "monthly":
                        expense.setDate(startDate);
                        startDate = startDate.plusMonths(1);
                        break;
                    default:
                        throw new IllegalArgumentException("Invalid frequency: " + updatedExpense.getFrequency());
                }
            }

            expenseRepository.saveAll(recurringExpenses);
        } else {
            throw new IllegalArgumentException("Expense with id " + id + " is not a recurring expense.");
        }
    }
}