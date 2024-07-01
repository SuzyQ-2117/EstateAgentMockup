package com.pals.backend.repos;

import com.pals.backend.entities.Buyer;
import com.pals.backend.entities.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerRepo extends JpaRepository<Seller, Integer> {
    Seller findByFirstNameIgnoreCaseAndSurNameIgnoreCase(String firstName, String surName);

}
