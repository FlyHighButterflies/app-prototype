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
public class AnalyticsService {

    @Autowired
    private ExpenseRepository expenseRepository;

    // Fetch total expenses for today for a specific user
    public Double getDailyExpense(Long userId) {
        LocalDate today = LocalDate.now();
        return expenseRepository.findAll().stream()
                .filter(expense -> expense.getDate().isEqual(today) && expense.getUser().getUserId().equals(userId))
                .mapToDouble(Expense::getAmount)
                .sum();
    }

    // Fetch total expenses for the current week
    public Double getWeeklyExpense() {
        LocalDate today = LocalDate.now();
        LocalDate startOfWeek = today.with(java.time.DayOfWeek.MONDAY);
        LocalDate endOfWeek = today.with(java.time.DayOfWeek.SUNDAY);

        return expenseRepository.findAll().stream()
                .filter(expense -> !expense.getDate().isBefore(startOfWeek) && !expense.getDate().isAfter(endOfWeek))
                .mapToDouble(Expense::getAmount)
                .sum();
    }

    // Fetch total expenses for the current month
    public Double getMonthlyExpense() {
        LocalDate today = LocalDate.now();
        LocalDate startOfMonth = today.with(TemporalAdjusters.firstDayOfMonth());
        LocalDate endOfMonth = today.with(TemporalAdjusters.lastDayOfMonth());

        return expenseRepository.findAll().stream()
                .filter(expense -> !expense.getDate().isBefore(startOfMonth) && !expense.getDate().isAfter(endOfMonth))
                .mapToDouble(Expense::getAmount)
                .sum();
    }

    // Fetch total expenses for the current year
    public Double getAnnualExpense() {
        LocalDate today = LocalDate.now();
        LocalDate startOfYear = today.with(TemporalAdjusters.firstDayOfYear());
        LocalDate endOfYear = today.with(TemporalAdjusters.lastDayOfYear());

        return expenseRepository.findAll().stream()
                .filter(expense -> !expense.getDate().isBefore(startOfYear) && !expense.getDate().isAfter(endOfYear))
                .mapToDouble(Expense::getAmount)
                .sum();
    }

    // // Fetch total expenses grouped by category
    // public Map<String, Double> getExpenseByCategory() {
    //     return expenseRepository.findAll().stream()
    //             .collect(Collectors.groupingBy(
    //                     Expense::getCategory,
    //                     Collectors.summingDouble(Expense::getAmount)
    //             ));
    // }
}
