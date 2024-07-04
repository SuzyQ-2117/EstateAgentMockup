package com.pals.backend.service;

import com.pals.backend.dtos.BuyerDto;
import com.pals.backend.entities.Seller;
import com.pals.backend.repos.SellerRepo;
import com.pals.backend.dtos.SellerDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SellerService {
    private SellerRepo repo;

    public SellerService(SellerRepo repo) {
        this.repo = repo;
    }


    // NOW READY TO TEST!


    public List<SellerDto> getall(){
        List<Seller> found = this.repo.findAll();
        List<SellerDto> foundDto = new ArrayList<>();
        for(Seller seller : found)
            foundDto.add(new SellerDto(seller));
        return foundDto;
    }

    public Seller sellerByFullName(String firstName, String surName){
        return this.repo.findByFirstNameIgnoreCaseAndSurNameIgnoreCase(firstName,surName);

    }
    public Seller addSeller( Seller seller){
        Seller created = this.repo.save(seller);
        return created;
    }

    public Seller sellerByID(Integer id){
        if(!this.repo.existsById(id))
            return null;
        Seller found = this.repo.findById(id).get();
        return found;
    }

    public Seller removeSeller( Integer id){
        Seller found = this.repo.findById(id).get();
        this.repo.deleteById(id);
        return found;
    }

    public Seller updateSeller( int id,
                                String firstName,
                                String surName){
        Seller toUpdate = this.repo.findById(id).get();
        if(firstName != null) toUpdate.setFirstName(firstName);
        if(surName != null) toUpdate.setSurName(surName);
        return this.repo.save(toUpdate);
    }
}
