package com.pals.backend.service;

import com.pals.backend.dtos.BuyerDto;
import com.pals.backend.entities.Buyer;
import com.pals.backend.repos.BuyerRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BuyerService {
    private BuyerRepo repo;

    public BuyerService(BuyerRepo repo) {
        this.repo = repo;
    }

//    public List<Buyer> getall(){
//
//        List<Buyer> found = this.repo.findAll();
//        return found;
//    }
    public List<BuyerDto> getall(){

        List<Buyer> found = this.repo.findAll();
        List<BuyerDto> allBuyers = new ArrayList<>();
        for (Buyer buyer : found){
            allBuyers.add(new BuyerDto(buyer));
        }
        return allBuyers;
    }

    public BuyerDto buyerByFullName(String firstName, String surname){
        Buyer found = this.repo.findByFirstNameIgnoreCaseAndSurnameIgnoreCase(firstName,surname);
        return new BuyerDto(found);


    }
    public Buyer addBuyer( Buyer buyer){
        Buyer created = this.repo.save(buyer);
        return created;
    }

    public BuyerDto buyerByID(Integer id){
        if(!this.repo.existsById(id))
            return null;
        Buyer found = this.repo.findById(id).get();
        return new BuyerDto(found);
    }

    public Buyer removeBuyer( Integer id){
        Buyer found = this.repo.findById(id).get();
        this.repo.deleteById(id);
        return found;
    }

    public Buyer updateBuyer( Integer id,
                                String firstName,
                                String surname){
        Buyer toUpdate = this.repo.findById(id).get();
        if(firstName != null) toUpdate.setFirstName(firstName);
        if(surname != null) toUpdate.setSurname(surname);
        return this.repo.save(toUpdate);
    }
}
