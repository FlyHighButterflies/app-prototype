package com.flyhighbutterflies.payamonte.controller;

import com.flyhighbutterflies.payamonte.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.time.LocalDate;
import java.util.HashMap;
import java.time.format.TextStyle;
import java.util.Locale;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    // Endpoint to fetch daily expenses for a specific user
    @GetMapping("/daily")
    public ResponseEntity<Map<String, Object>> getDailyAnalytics(@RequestParam Long userId) {
        Double dailyExpense = analyticsService.getDailyExpense(userId);
        LocalDate today = LocalDate.now();
        String dayOfWeek = today.getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.ENGLISH);
        Map<String, Object> response = new HashMap<>();
        response.put("date", today);
        response.put("dayOfWeek", dayOfWeek);
        response.put("dailyExpense", dailyExpense);
        return ResponseEntity.ok(response);
    }

    // Endpoint to fetch weekly expenses
    @GetMapping("/weekly")
    public ResponseEntity<Double> getWeeklyAnalytics() {
        Double weeklyExpense = analyticsService.getWeeklyExpense();
        return ResponseEntity.ok(weeklyExpense);
    }

    // Endpoint to fetch monthly expenses
    @GetMapping("/monthly")
    public ResponseEntity<Double> getMonthlyAnalytics() {
        Double monthlyExpense = analyticsService.getMonthlyExpense();
        return ResponseEntity.ok(monthlyExpense);
    }

    // Endpoint to fetch annual expenses
    @GetMapping("/annual")
    public ResponseEntity<Double> getAnnualAnalytics() {
        Double annualExpense = analyticsService.getAnnualExpense();
        return ResponseEntity.ok(annualExpense);
    }

    // // Endpoint to fetch total expenses grouped by category
    // @GetMapping("/categories")
    // public ResponseEntity<Map<String, Double>> getCategoryAnalytics() {
    //     Map<String, Double> expensesByCategory = analyticsService.getExpenseByCategory();
    //     return ResponseEntity.ok(expensesByCategory);
    // }
}
