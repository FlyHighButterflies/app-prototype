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
import java.time.temporal.IsoFields;

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
        response.put("dailyExpense", dailyExpense != null ? dailyExpense : 0);  // Prevent null
        return ResponseEntity.ok(response);
    }

    // Endpoint to fetch weekly expenses
    @GetMapping("/weekly")
    public ResponseEntity<Map<String, Object>> getWeeklyAnalytics(@RequestParam Long userId) {
        Double weeklyExpense = analyticsService.getWeeklyExpense(userId);
        LocalDate today = LocalDate.now();
        Map<String, Object> response = new HashMap<>();
        response.put("date", today);
        response.put("weekOfYear", today.get(IsoFields.WEEK_OF_WEEK_BASED_YEAR));
        response.put("weeklyExpense", weeklyExpense != null ? weeklyExpense : 0);  // Prevent null
        return ResponseEntity.ok(response);
    }

    // Endpoint to fetch monthly expenses
    @GetMapping("/monthly")
    public ResponseEntity<Map<String, Object>> getMonthlyAnalytics(@RequestParam Long userId) {
        Double monthlyExpense = analyticsService.getMonthlyExpense(userId);
        LocalDate today = LocalDate.now();
        String month = today.getMonth().getDisplayName(TextStyle.FULL, Locale.ENGLISH);
        Map<String, Object> response = new HashMap<>();
        response.put("date", today);
        response.put("month", month);
        response.put("monthlyExpense", monthlyExpense != null ? monthlyExpense : 0);  // Prevent null
        return ResponseEntity.ok(response);
    }

    // Endpoint to fetch annual expenses
    @GetMapping("/annual")
    public ResponseEntity<Map<String, Object>> getAnnualAnalytics(@RequestParam Long userId) {
        Double annualExpense = analyticsService.getAnnualExpense(userId);
        LocalDate today = LocalDate.now();
        int year = today.getYear();
        Map<String, Object> response = new HashMap<>();
        response.put("date", today);
        response.put("year", year);
        response.put("annualExpense", annualExpense != null ? annualExpense : 0);  // Prevent null
        return ResponseEntity.ok(response);
    }

    // Endpoint to fetch total expenses grouped by category
    @GetMapping("/categories")
    public ResponseEntity<Map<String, Object>> getCategoryAnalytics(@RequestParam Long userId) {
        Map<String, Double> expensesByCategory = analyticsService.getExpenseByCategory(userId);
        LocalDate today = LocalDate.now();
        Map<String, Object> response = new HashMap<>();
        response.put("date", today);
        response.put("expensesByCategory", expensesByCategory != null ? expensesByCategory : new HashMap<>());  // Prevent null
        return ResponseEntity.ok(response);
    }
}
