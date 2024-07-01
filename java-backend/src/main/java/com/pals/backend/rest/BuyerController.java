package com.pals.backend.rest;

import com.pals.backend.entities.Buyer;
import com.pals.backend.service.BuyerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BuyerController {

private BuyerService service;

    public BuyerController(BuyerService service) {
        this.service = service;
    }


    @PostMapping("/Buyer/add")
    public Buyer addBuyer(@RequestBody Buyer buyer){
    return this.service.addBuyer(buyer);
    }

    @GetMapping("/Buyer/All")
    public List<Buyer> getAllBuyers(){
    return this.service.getall();
    }

    @GetMapping("/Buyer/get/{Id}")
    public Buyer getBuyerById(@PathVariable Integer Id){
        return this.service.buyerByID(Id);
    }

    @GetMapping("/Buyer/Find/{fName}/{sName}")
    public Buyer buyerByFullName(@PathVariable String fName, @PathVariable String sName){
        return this.service.buyerByFullName(fName,sName);
    }


    @DeleteMapping("/Buyer/remove/{id}")
    public Buyer removePerson(@PathVariable Integer id){
//        Buyer persontoremove = this.persons.get(id);
        return this.service.removeBuyer(id);
    }

    @PatchMapping("/Buyer/update/{id}")
    public Buyer updateBuyer(@PathVariable int id,
                               @RequestParam(required = false) String firstName,
                               @RequestParam(required = false) String surName){
        return this.service.updateBuyer(id,firstName,surName) ;
    }


}
