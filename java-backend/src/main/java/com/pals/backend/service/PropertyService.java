package com.pals.backend.service;

import com.pals.backend.entities.Property;
import com.pals.backend.repos.PropertyRepo;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;

@Service
public class PropertyService {
    private PropertyRepo repo;

    public PropertyService(PropertyRepo repo) {
        this.repo = repo;
    }

    public List<Property> getAll() {
        List<Property> found = this.repo.findAll();
        return found;
    }

    public Property addProperty(Property property) {
        Property created = this.repo.save(property);
        return created;
    }

    public Property propertyByID(Integer id){
        if(!this.repo.existsById(id))
            return null;
        Property found = this.repo.findById(id).get();
        return found;
    }

    public Property deleteProperty(Integer id){
        Property found = this.repo.findById(id).get();
        this.repo.deleteById(id);
        return found;
    }

    public Property updateProperty(Integer id,
                                   String Address,
                                   Integer Price,
                                   Integer Bedrooms,
                                   Integer Bathrooms,
                                   String ImageURL,
                                   Boolean Garden,
                                   String SaleStatus){
        Property toUpdate = this.repo.findById(id).get();
        if(Address != null) toUpdate.setAddress(Address);
        if(Price != null) toUpdate.setPrice(Price);
        if(Bedrooms != null) toUpdate.setBedrooms(Bedrooms);
        if(Bathrooms != null) toUpdate.setBathrooms(Bathrooms);
        if(ImageURL != null) toUpdate.setImageURL(ImageURL);
        if(Garden != null) toUpdate.setGarden(Garden);
        if(SaleStatus != null) toUpdate.setSaleStatus(SaleStatus);
        return this.repo.save(toUpdate);
    }






}