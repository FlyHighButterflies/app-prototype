package com.flyhighbutterflies.payamonte.service;

import java.util.Map;

public interface IAnalyticsService {
    Double getDailyExpense(Long userId);
    Double getWeeklyExpense(Long userId);
    Double getMonthlyExpense(Long userId);
    Double getAnnualExpense(Long userId);
    Map<String, Double> getExpenseByCategory(Long userId);
}
