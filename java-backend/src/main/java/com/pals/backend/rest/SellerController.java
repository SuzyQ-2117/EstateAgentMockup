package com.pals.backend.rest;

import com.pals.backend.entities.Seller;
import com.pals.backend.service.SellerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SellerController {

private SellerService service;

    public SellerController(SellerService service) {
        this.service = service;
    }


    @PostMapping("/Seller/add")
    public Seller addSeller(@RequestBody Seller seller){
    return this.service.addSeller(seller);
    }

    @GetMapping("/Seller/All")
    public List<Seller> getAllSellers(){
    return this.service.getall();
    }

    @GetMapping("/Seller/get/{Id}")
    public Seller getSellerById(@PathVariable Integer Id){
        return this.service.sellerByID(Id);
    }

    @GetMapping("/Seller/Find/{fName}/{sName}")
    public Seller sellerByFullName(@PathVariable String fName, @PathVariable String sName){
        return this.service.sellerByFullName(fName,sName);
    }


    @DeleteMapping("/Seller/remove/{id}")
    public Seller removePerson(@PathVariable Integer id){
//        Seller persontoremove = this.persons.get(id);
        return this.service.removeSeller(id);
    }

    @PatchMapping("/Seller/update/{id}")
    public Seller updateSeller(@PathVariable int id,
                               @RequestParam(required = false) String firstName,
                               @RequestParam(required = false) String surName){
        return this.service.updateSeller(id,firstName,surName) ;
    }


}
