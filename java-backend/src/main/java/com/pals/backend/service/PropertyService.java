package com.pals.backend.service;

import com.pals.backend.dtos.BookingDto;
import com.pals.backend.dtos.PropertyDTO;
import com.pals.backend.entities.Booking;
import com.pals.backend.entities.Property;
import com.pals.backend.repos.NoPropDao;
import com.pals.backend.repos.PropSearchDao;
import com.pals.backend.repos.PropertyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    public List<PropertyDTO> getAll() {
        List<Property> found = this.repo.findAll();
        List<PropertyDTO> dtos = new ArrayList<>();
        for (Property property : found) {
            dtos.add(new PropertyDTO(property));
        }
        return dtos;
    }


    public List<Property> getAllByPredicate(Integer minPrice, Integer maxPrice, Integer minBedrooms, Integer maxBedrooms, Integer minBathrooms, Integer maxBathrooms, Boolean hasGarden, Boolean exSold) {
        List<Property> found = this.propSearchDao.findFilteredProperties(minPrice,maxPrice,minBedrooms,maxBedrooms, minBathrooms, maxBathrooms, hasGarden, exSold);
        return found;
    }

    // Add a new property and return it
    public Property addProperty(Property property) {
        Property created = this.repo.save(property);
        return created;
    }

    // Get a property by ID and convert it to a DTO
    public PropertyDTO propertyByID(Integer id) {
        return this.repo.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    // Remove a property and return it as a DTO
    public PropertyDTO removeProperty(Integer id) {
        Property found = this.repo.findById(id).orElse(null);
        if (found != null) {
            this.repo.deleteById(id);
            return convertToDTO(found);
        }
        return null;
    }

    // Update a property and return it as a DTO
    public PropertyDTO updateProperty(Integer id,
                                      String address,
                                      Integer price,
                                      Integer bedrooms,
                                      Integer bathrooms,
                                      String imageURL,
                                      Boolean garden,
                                      String saleStatus) {
        Property toUpdate = this.repo.findById(id).orElse(null);
        if (toUpdate == null) {
            return null;
        }
        if (address != null) toUpdate.setAddress(address);
        if (price != null) toUpdate.setPrice(price);
        if (bedrooms != null) toUpdate.setBedrooms(bedrooms);
        if (bathrooms != null) toUpdate.setBathrooms(bathrooms);
        if (imageURL != null) toUpdate.setImageURL(imageURL);
        if (garden != null) toUpdate.setGarden(garden);
        if (saleStatus != null) toUpdate.setSaleStatus(saleStatus);
        Property updated = this.repo.save(toUpdate);
        return convertToDTO(updated);
    }

}