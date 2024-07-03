package com.pals.backend.dtos;

import com.pals.backend.entities.Property;
import com.pals.backend.entities.Seller;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.ArrayList;
import java.util.List;

@Entity
public class SellerDto {

    @Id
    @GeneratedValue (strategy= GenerationType.IDENTITY)
    private int sellerId;
    private String firstName;
    private String surName;


//private List<PropertyDto> properties = new ArrayList<>();

public SellerDto(Seller seller){
    this.sellerId = seller.getSellerId();
    this.firstName=seller.getFirstName();
    this.surName= seller.getSurName();
//    if(seller.getProperties() != null){
//        for(Property property : seller.getProperties())
//            this.properties.add(new PropertyDto(property));
//    }
}

//    public List<PropertyDto> getProperties() {
//        return properties;
//    }
//
//    public void setProperties(List<PropertyDto> properties) {
//        this.properties = properties;
//    }

    public SellerDto(String firstName, String surName) {
        this.firstName = firstName;
        this.surName = surName;
    }

    public SellerDto() {
    }

    public int getSellerId() {
        return sellerId;
    }

    public void setSellerId(int sellerId) {
        this.sellerId = sellerId;
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
                "sellerId=" + sellerId +
                ", firstName='" + firstName + '\'' +
                ", surName='" + surName + '\'' +
                '}';
    }
}
