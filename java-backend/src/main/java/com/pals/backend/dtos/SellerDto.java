package com.pals.backend.dtos;

import com.pals.backend.entities.Property;
import com.pals.backend.entities.Seller;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.ArrayList;
import java.util.List;

public class SellerDto {

    private int id;
    private String firstName;
    private String surName;


    private List<PropertyDTO> properties = new ArrayList<>();

    public SellerDto(Seller seller){
        this.id = seller.getId();
        this.firstName=seller.getFirstName();
        this.surName= seller.getSurName();
        if(seller.getProperties() != null){
            for(Property property : seller.getProperties())
                this.properties.add(new PropertyDTO(property));
        }
    }


    public List<PropertyDTO> getProperties() {
        return properties;
    }

    public void setProperties(List<PropertyDTO> properties) {
        this.properties = properties;
    }

    public SellerDto(String firstName, String surName) {
        this.firstName = firstName;
        this.surName = surName;
    }

    public SellerDto() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSurName() {
        return surName;
    }

    public void setSurName(String surName) {
        this.surName = surName;
    }

    @Override
    public String toString() {
        return "Seller{" +
                "sellerId=" + id +
                ", firstName='" + firstName + '\'' +
                ", surName='" + surName + '\'' +
                '}';
    }
}
