package com.flyhighbutterflies.payamonte.controller;

import com.flyhighbutterflies.payamonte.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.time.LocalDate;
import java.util.List;
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
        response.put("dailyExpense", dailyExpense);  // Prevent null
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
        response.put("weeklyExpense", weeklyExpense); 
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
        response.put("monthlyExpense", monthlyExpense);  
        return ResponseEntity.ok(response);
    }

    // Endpoint to fetch total expenses grouped by category
    @GetMapping("/categories")
    public ResponseEntity<Map<String, Object>> getCategoryAnalytics(@RequestParam Long userId) {
        Map<String, Double> expensesByCategory = analyticsService.getExpenseByCategory(userId);
        LocalDate today = LocalDate.now();
        Map<String, Object> response = new HashMap<>();
        response.put("date", today);
        response.put("expensesByCategory", expensesByCategory);  
        return ResponseEntity.ok(response);
    }
  

    // Endpoint to fetch weekly expenses for a specific user (Sunday to Saturday)
    @GetMapping("/weekly/days")
    public ResponseEntity<List<Map<String, Object>>> getWeeklyExpensesByDays(@RequestParam Long userId) {
        List<Map<String, Object>> dailyExpenses = analyticsService.getWeeklyExpensesByDays(userId); // Ensure type consistency
        return ResponseEntity.ok(dailyExpenses); // Return the correct variable
    }

    // Endpoint to fetch monthly expenses for a specific user (January to December)
    @GetMapping("/monthly/all")
    public ResponseEntity<List<Map<String, Object>>> getYearlyMonthlyExpenses(@RequestParam Long userId) {
        List<Map<String, Object>> responseList = analyticsService.getYearlyMonthlyExpenses(userId);
        return ResponseEntity.ok(responseList);
    }

}
