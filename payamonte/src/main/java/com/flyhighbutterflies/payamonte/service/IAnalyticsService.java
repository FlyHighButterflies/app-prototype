package com.flyhighbutterflies.payamonte.service;

import java.util.Map;
import java.util.List;
import java.time.LocalDate;


public interface IAnalyticsService {
    Double getDailyExpense(Long userId);
    Double getWeeklyExpense(Long userId);
    Double getMonthlyExpense(Long userId);
    Map<String, Double> getExpenseByCategory(Long userId);
    Map<String, Double> getWeeklyExpensesByDays(Long userId, LocalDate today);
    List<Map<String, Object>> getYearlyMonthlyExpenses(Long userId);
}
