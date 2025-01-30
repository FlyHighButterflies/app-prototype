package com.flyhighbutterflies.payamonte.service;

import java.util.Map;
import java.util.List;



public interface IAnalyticsService {
    Double getDailyExpense(Long userId);
    Double getWeeklyExpense(Long userId);
    Double getMonthlyExpense(Long userId);
    Map<String, Double> getExpenseByCategory(Long userId);
    List<Map<String, Object>> getWeeklyExpensesByDays(Long userId);
    List<Map<String, Object>> getYearlyMonthlyExpenses(Long userId);
}
