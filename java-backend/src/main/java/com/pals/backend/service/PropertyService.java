package com.pals.backend.service;

import com.pals.backend.dtos.BookingDto;
import com.pals.backend.dtos.PropertyDTO;
import com.pals.backend.entities.Booking;
import com.pals.backend.entities.Property;
import com.pals.backend.repos.PropertyRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PropertyService {
    private PropertyRepo repo;

    public PropertyService(PropertyRepo repo) {
        this.repo = repo;
    }

    // convert a Property object into a PropertyDTO
    private PropertyDTO convertToDTO(Property property) {
        return new PropertyDTO(
                property.getId(),
                property.getImageURL(),
                property.getAddress(),
                property.getPrice(),
                property.getBedrooms(),
                property.getBathrooms(),
                property.isGarden(),
                property.getSaleStatus(),
                property.getSeller()
        );
    }

    // Convert a DTO into a Property object
    private Property convertToEntity(Property propertyDTO) {
        Property property = new Property();
        property.setId(propertyDTO.getId());
        property.setImageURL(propertyDTO.getImageURL());
        property.setAddress(propertyDTO.getAddress());
        property.setPrice(propertyDTO.getPrice());
        property.setBedrooms(propertyDTO.getBedrooms());
        property.setBathrooms(propertyDTO.getBathrooms());
        property.setGarden(propertyDTO.isGarden());
        property.setSaleStatus(propertyDTO.getSaleStatus());
        return property;
    }

    // GetAll() properties and convert to dtos
//    public List<PropertyDTO> getAll() {
//        return this.repo.findAll().stream()
//                .map(this::convertToDTO)
//                .collect(Collectors.toList());
//    }

    public List<PropertyDTO> getAll() {
        List<Property> found = this.repo.findAll();
        List<PropertyDTO> dtos = new ArrayList<>();
        for (Property property : found) {
            dtos.add(new PropertyDTO(property));
        }
        return dtos;
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
        if (toUpdate != null) {
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







