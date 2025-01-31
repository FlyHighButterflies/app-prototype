package com.flyhighbutterflies.payamonte.service;

import com.flyhighbutterflies.payamonte.model.Budget;
import com.flyhighbutterflies.payamonte.model.Expense;
import com.flyhighbutterflies.payamonte.repository.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.time.LocalDate;

// TO-DO:
// Fix the code to dynamically display the user's remaining balance and total expenses in the user's budget table. 
// Check user model if the issue is there

@Service
public class BudgetService implements IBudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    @Override
    public List<Budget> getAllBudgets() {
        return budgetRepository.findAll();
    }

    // TO-DO: update the code to only calculate the total expenses that are not after the current date
    // refer to getRemainingBalance method for the correct implementation
    @Override
    public Budget getBudgetById(Long id) {
        Budget budget = budgetRepository.findById(id).orElseThrow(() -> new RuntimeException("Budget not found"));
        updateBudgetExpenses(budget);
        return budget;
    }

    // fix
    @Override
    public Budget createBudget(Budget budget) {
        if (budgetRepository.findByUserUserId(budget.getUser().getUserId()).isPresent()) {
            throw new RuntimeException("User already has a budget");
        }
        updateBudgetExpenses(budget);
        return budgetRepository.save(budget);
    }

    @Override
    public Budget updateBudget(Long id, Budget budgetDetails) {
        Budget budget = getBudgetById(id);
        budget.setTotalBalance(budgetDetails.getTotalBalance());
        budget.setDatetimeUpdated(budgetDetails.getDatetimeUpdated());
        budget.setUser(budgetDetails.getUser());
        updateBudgetExpenses(budget);
        return budgetRepository.save(budget);
    }

    // fix
    private void updateBudgetExpenses(Budget budget) {
        double totalExpense = budget.getUser().getExpenses() != null ? 
            budget.getUser().getExpenses().stream()
                .filter(expense -> !expense.getDate().isAfter(LocalDate.now()))
                .mapToDouble(Expense::getAmount).sum() : 0.0;
        budget.setTotalExpense(totalExpense);
        System.out.println(totalExpense);
        budget.setRemainingBalance(budget.getTotalBalance() - totalExpense);

        budgetRepository.save(budget);
    }

    @Override
    public void deleteBudget(Long id) {
        Budget budget = getBudgetById(id);
        budgetRepository.delete(budget);
    }

    public Double getRemainingBalance(Long userId) {
        Budget budget = budgetRepository.findByUserUserId(userId).orElseThrow(() -> new RuntimeException("Budget not found"));
        double totalExpense = budget.getUser().getExpenses().stream()
        .filter(expense -> !expense.getDate().isAfter(LocalDate.now()))
        .mapToDouble(Expense::getAmount).sum();
        budget.setTotalExpense(totalExpense);
        return budget.getTotalBalance() - totalExpense;
    }
}
