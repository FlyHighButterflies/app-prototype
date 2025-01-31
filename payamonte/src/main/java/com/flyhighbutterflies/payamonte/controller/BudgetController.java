package com.flyhighbutterflies.payamonte.controller;

import com.flyhighbutterflies.payamonte.model.Budget;
import com.flyhighbutterflies.payamonte.service.BudgetService;
import com.flyhighbutterflies.payamonte.model.Expense;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    @GetMapping
    public List<Budget> getAllBudgets() {
        List<Budget> budgets = budgetService.getAllBudgets();
        // Calculate and set the remaining balance for each budget/user
        budgets.forEach(budget -> {
            double totalExpense = budget.getUser().getExpenses().stream().mapToDouble(Expense::getAmount).sum();
            budget.setTotalExpense(totalExpense);
            budget.setRemainingBalance(budget.getTotalBalance() - totalExpense);
        });
        return budgets;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Budget> getBudgetById(@PathVariable Long id) {
        Budget budget = budgetService.getBudgetById(id);
        // Calculate and set the remaining balance for the specific budget/user
        double totalExpense = budget.getUser().getExpenses().stream().mapToDouble(Expense::getAmount).sum();
        budget.setTotalExpense(totalExpense);
        budget.setRemainingBalance(budget.getTotalBalance() - totalExpense);
        return ResponseEntity.ok(budget);
    }

    // working
    @GetMapping("/{id}/remaining-balance")
    public ResponseEntity<Double> getRemainingBalance(@PathVariable Long id) {
        Budget budget = budgetService.getBudgetById(id);
        Double remainingBalance = budget.getRemainingBalance();
        return ResponseEntity.ok(remainingBalance);
    }

    @PostMapping
    public Budget createBudget(@RequestBody Budget budget) {
        return budgetService.createBudget(budget);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Budget> updateBudget(@PathVariable Long id, @RequestBody Budget budgetDetails) {
        Budget updatedBudget = budgetService.updateBudget(id, budgetDetails);
        return ResponseEntity.ok(updatedBudget);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBudget(@PathVariable Long id) {
        budgetService.deleteBudget(id);
        return ResponseEntity.noContent().build();
    }
}
