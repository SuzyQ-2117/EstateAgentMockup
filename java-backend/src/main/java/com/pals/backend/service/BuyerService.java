package com.pals.backend.service;

import com.pals.backend.entities.Buyer;
import com.pals.backend.repos.BuyerRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BuyerService {
    private BuyerRepo repo;

    public BuyerService(BuyerRepo repo) {
        this.repo = repo;
    }

    public List<Buyer> getall(){

        List<Buyer> found = this.repo.findAll();
        return found;
    }

    public Buyer buyerByFullName(String firstName, String surName){
        return this.repo.findByFirstNameIgnoreCaseAndSurNameIgnoreCase(firstName,surName);

    }
    public Buyer addBuyer( Buyer buyer){
        Buyer created = this.repo.save(buyer);
        return created;
    }

    public Buyer buyerByID(Integer id){
        if(!this.repo.existsById(id))
            return null;
        Buyer found = this.repo.findById(id).get();
        return found;
    }

    public Buyer removeBuyer( Integer id){
        Buyer found = this.repo.findById(id).get();
        this.repo.deleteById(id);
        return found;
    }

    public Buyer updateBuyer( int id,
                                String firstName,
                                String surName){
        Buyer toUpdate = this.repo.findById(id).get();
        if(firstName != null) toUpdate.setFirstName(firstName);
        if(surName != null) toUpdate.setSurName(surName);
        return this.repo.save(toUpdate);
    }
}
