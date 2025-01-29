package com.flyhighbutterflies.payamonte.repository;

import com.flyhighbutterflies.payamonte.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {
    Optional<Budget> findByUserUserId(Long userId);
}
