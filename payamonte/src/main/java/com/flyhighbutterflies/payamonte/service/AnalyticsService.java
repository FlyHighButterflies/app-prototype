package com.flyhighbutterflies.payamonte.service;

import com.flyhighbutterflies.payamonte.model.Expense;
import com.flyhighbutterflies.payamonte.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;
import java.util.HashMap;
import java.util.ArrayList;

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

    // Fetch weekly expenses (Sunday to Saturday) for a specific user
    @Override
    public Map<String, Double> getWeeklyExpensesByDays(Long userId, LocalDate today) {
        LocalDate startOfWeek = today.with(java.time.DayOfWeek.SUNDAY);  // Start of the week (Sunday)
        Map<String, Double> dailyExpenses = new HashMap<>();

        // Loop through the week from Sunday to Saturday
        for (int i = 0; i < 7; i++) {
            LocalDate day = startOfWeek.plusDays(i);  // Each day of the week
            String dayOfWeek = day.getDayOfWeek().getDisplayName(java.time.format.TextStyle.FULL, java.util.Locale.ENGLISH); // Day of the week as string

            // Get the expense for that specific day
            Double dailyExpense = expenseRepository.findAll().stream()
                    .filter(expense -> expense.getUser().getUserId().equals(userId) && expense.getDate().isEqual(day))
                    .mapToDouble(Expense::getAmount)
                    .sum();
            dailyExpenses.put(dayOfWeek, dailyExpense);
        }
        return dailyExpenses;
    }

    // Fetch total expenses for each month in the year (January to December)
    @Override
    public List<Map<String, Object>> getYearlyMonthlyExpenses(Long userId) {
        List<Map<String, Object>> responseList = new ArrayList<>();
        LocalDate today = LocalDate.now();
        
        for (int month = 1; month <= 12; month++) {
            // Calculate start and end of the month
            LocalDate startOfMonth = today.withMonth(month).with(TemporalAdjusters.firstDayOfMonth());
            LocalDate endOfMonth = today.withMonth(month).with(TemporalAdjusters.lastDayOfMonth());

            // Get monthly expense for that month
            Double monthlyExpense = expenseRepository.findAll().stream()
                    .filter(expense -> expense.getUser().getUserId().equals(userId) &&
                            !expense.getDate().isBefore(startOfMonth) && !expense.getDate().isAfter(endOfMonth))
                    .mapToDouble(Expense::getAmount)
                    .sum();

            // Prepare the response for each month
            Map<String, Object> monthData = new HashMap<>();
            String monthName = startOfMonth.getMonth().getDisplayName(java.time.format.TextStyle.FULL, java.util.Locale.ENGLISH);
            monthData.put("monthOfYear", monthName);
            monthData.put("monthlyExpense", monthlyExpense != null ? monthlyExpense : 0);  // Prevent null
            
            responseList.add(monthData);
        }

        return responseList;
    }
}
