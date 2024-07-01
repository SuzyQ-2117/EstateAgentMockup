package com.pals.backend.repos;

import com.pals.backend.entities.Buyer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuyerRepo extends JpaRepository<Buyer, Integer> {
Buyer findByFirstNameIgnoreCaseAndSurNameIgnoreCase(String firstName, String surName);
}
