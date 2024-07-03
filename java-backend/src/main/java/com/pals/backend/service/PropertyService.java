package com.pals.backend.service;

import com.pals.backend.entities.Property;
import com.pals.backend.repos.PropertyRepo;
import org.springframework.stereotype.Service;

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

    public Property removeProperty(Integer id){
        Property found = this.repo.findById(id).get();
        this.repo.deleteById(id);
        return found;
    }

    public Property updateProperty(Integer id,
                                   String address,
                                   Integer price,
                                   Integer bedrooms,
                                   Integer bathrooms,
                                   String imageURL,
                                   Boolean garden,
                                   String saleStatus){
        Property toUpdate = this.repo.findById(id).get();
        if(address != null) toUpdate.setAddress(address);
        if(price != null) toUpdate.setPrice(price);
        if(bedrooms != null) toUpdate.setBedrooms(bedrooms);
        if(bathrooms != null) toUpdate.setBathrooms(bathrooms);
        if(imageURL != null) toUpdate.setImageURL(imageURL);
        if(garden != null) toUpdate.setGarden(garden);
        if(saleStatus != null) toUpdate.setSaleStatus(saleStatus);
        return this.repo.save(toUpdate);
    }
    
}







