package com.flyhighbutterflies.payamonte.service;

import com.flyhighbutterflies.payamonte.model.Budget;
import com.flyhighbutterflies.payamonte.model.Expense;
import com.flyhighbutterflies.payamonte.repository.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BudgetService implements IBudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    @Override
    public List<Budget> getAllBudgets() {
        return budgetRepository.findAll();
    }

    @Override
    public Budget getBudgetById(Long id) {
        Budget budget = budgetRepository.findById(id).orElseThrow(() -> new RuntimeException("Budget not found"));
        double totalExpense = budget.getUser().getExpenses().stream().mapToDouble(Expense::getAmount).sum();
        budget.setTotalExpense(totalExpense);
        budget.setRemainingBalance(budget.getTotalBalance() - totalExpense);
        return budget;
    }

    @Override
    public Budget createBudget(Budget budget) {
        if (budgetRepository.findByUserUserId(budget.getUser().getUserId()).isPresent()) {
            throw new RuntimeException("User already has a budget");
        }
        return budgetRepository.save(budget);
    }

    @Override
    public Budget updateBudget(Long id, Budget budgetDetails) {
        Budget budget = getBudgetById(id);
        budget.setTotalBalance(budgetDetails.getTotalBalance());
        budget.setTotalExpense(budgetDetails.getTotalExpense());
        budget.setDatetimeUpdated(budgetDetails.getDatetimeUpdated());
        budget.setUser(budgetDetails.getUser());
        return budgetRepository.save(budget);
    }

    @Override
    public void deleteBudget(Long id) {
        Budget budget = getBudgetById(id);
        budgetRepository.delete(budget);
    }

    public Double getRemainingBalance(Long userId) {
        Budget budget = budgetRepository.findByUserUserId(userId).orElseThrow(() -> new RuntimeException("Budget not found"));
        double totalExpense = budget.getUser().getExpenses().stream().mapToDouble(Expense::getAmount).sum();
        budget.setTotalExpense(totalExpense);
        return budget.getTotalBalance() - totalExpense;
    }
}
