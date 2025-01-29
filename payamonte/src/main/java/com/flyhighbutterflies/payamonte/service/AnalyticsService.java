package com.flyhighbutterflies.payamonte.service;

import com.flyhighbutterflies.payamonte.model.Expense;
import com.flyhighbutterflies.payamonte.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AnalyticsService implements IAnalyticsService {

    @Autowired
    private ExpenseRepository expenseRepository;

    // Fetch total expenses for today for a specific user
    @Override
    public Double getDailyExpense(Long userId) {
        LocalDate today = LocalDate.now();
        return expenseRepository.findAll().stream()
                .filter(expense -> expense.getDate().isEqual(today) && expense.getUser().getUserId().equals(userId))
                .mapToDouble(Expense::getAmount)
                .sum();
    }

    // Fetch total expenses for the current week for a specific user
    @Override
    public Double getWeeklyExpense(Long userId) {
        LocalDate today = LocalDate.now();
        LocalDate startOfWeek = today.with(java.time.DayOfWeek.MONDAY);
        LocalDate endOfWeek = today.with(java.time.DayOfWeek.SUNDAY);

        return expenseRepository.findAll().stream()
                .filter(expense -> expense.getUser().getUserId().equals(userId) &&
                        !expense.getDate().isBefore(startOfWeek) && !expense.getDate().isAfter(endOfWeek))
                .mapToDouble(Expense::getAmount)
                .sum();
    }

    // Fetch total expenses for the current month for a specific user
    @Override
    public Double getMonthlyExpense(Long userId) {
        LocalDate today = LocalDate.now();
        LocalDate startOfMonth = today.with(TemporalAdjusters.firstDayOfMonth());
        LocalDate endOfMonth = today.with(TemporalAdjusters.lastDayOfMonth());

        return expenseRepository.findAll().stream()
                .filter(expense -> expense.getUser().getUserId().equals(userId) &&
                        !expense.getDate().isBefore(startOfMonth) && !expense.getDate().isAfter(endOfMonth))
                .mapToDouble(Expense::getAmount)
                .sum();
    }

    // Fetch total expenses for the current year for a specific user
    @Override
    public Double getAnnualExpense(Long userId) {
        LocalDate today = LocalDate.now();
        LocalDate startOfYear = today.with(TemporalAdjusters.firstDayOfYear());
        LocalDate endOfYear = today.with(TemporalAdjusters.lastDayOfYear());

        return expenseRepository.findAll().stream()
                .filter(expense -> expense.getUser().getUserId().equals(userId) &&
                        !expense.getDate().isBefore(startOfYear) && !expense.getDate().isAfter(endOfYear))
                .mapToDouble(Expense::getAmount)
                .sum();
    }

    // Fetch total expenses grouped by category for a specific user
    @Override
    public Map<String, Double> getExpenseByCategory(Long userId) {
        return expenseRepository.findAll().stream()
                .filter(expense -> expense.getUser().getUserId().equals(userId))
                .collect(Collectors.groupingBy(
                        Expense::getCategory,
                        Collectors.summingDouble(Expense::getAmount)
                ));
    }
}
