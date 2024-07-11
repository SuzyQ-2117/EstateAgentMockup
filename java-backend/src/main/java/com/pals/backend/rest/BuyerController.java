package com.pals.backend.rest;

import com.pals.backend.dtos.BuyerDto;
import com.pals.backend.entities.Buyer;
import com.pals.backend.entities.Property;
import com.pals.backend.service.BuyerService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController

public class BuyerController {

private BuyerService service;

    public BuyerController(BuyerService service) {
        this.service = service;
    }

    @PostMapping("/buyer/add")
    public Buyer addBuyer(@RequestBody Buyer buyer){
    return this.service.addBuyer(buyer);
    }

    @GetMapping("/buyer/all")
    public List<BuyerDto> getAllBuyers(){
//        public List<Buyer> getAllBuyers(){
    return this.service.getall();
    }

    @GetMapping("/buyer/get/{Id}")
    public BuyerDto getBuyerById(@PathVariable Integer Id){
        return this.service.buyerByID(Id);
    }

    @GetMapping("/buyer/find/{fName}/{sName}")
    public BuyerDto buyerByFullName(@PathVariable String fName, @PathVariable String sName){
        return this.service.buyerByFullName(fName,sName);
    }
//
//    @DeleteMapping("/buyer/remove/{id}")
//    public BuyerDto removePerson(@PathVariable Integer id){
////        Buyer persontoremove = this.persons.get(id);
//        return this.service.removeBuyer(id);
//    }
//
    @PatchMapping("/buyer/update/{id}")
    public BuyerDto updateBuyer(@PathVariable int id,
                               @RequestParam(required = false) String firstName,
                               @RequestParam(required = false) String surname){
        return this.service.updateBuyer(id,firstName,surname) ;
    }
}