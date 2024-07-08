package com.pals.backend.service;

import com.pals.backend.entities.Property;
import com.pals.backend.repos.NoPropDao;
import com.pals.backend.repos.PropSearchDao;
import com.pals.backend.repos.PropertyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropertyService {
    @Autowired
    private PropertyRepo repo;
@Autowired
    private PropSearchDao propSearchDao;
    public PropertyService(PropertyRepo repo) {
        this.repo = repo;
    }

    public PropertyService(PropSearchDao propSearchDao) {
        this.propSearchDao = propSearchDao;
    }

    public PropertyService() {
    }

    public List<Property> getAll() {
        List<Property> found = this.repo.findAll();
        return found;
    }

//    public String findNoProps() {
//        String found = this.noPropDao.findNoProps();
//        return found;
//    }

    public List<Property> getAllByPredicate(Integer minPrice, Integer maxPrice, Integer minBedrooms, Integer maxBedrooms, Integer minBathrooms, Integer maxBathrooms, Boolean hasGarden, Boolean exSold) {
        List<Property> found = this.propSearchDao.findFilteredProperties(minPrice,maxPrice,minBedrooms,maxBedrooms, minBathrooms, maxBathrooms, hasGarden, exSold);
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







