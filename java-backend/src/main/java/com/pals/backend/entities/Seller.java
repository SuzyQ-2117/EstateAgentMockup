package com.pals.backend.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Seller {

    @Id
    @GeneratedValue (strategy= GenerationType.IDENTITY)
    private int sellerId;
    private String firstName;
    private String surName;
////
////    @OneToMany(mappedBy = "SellerID")
////    private List<Property> properties;
//
//    public List<Property> getProperties() {
//        return properties;
//    }
//
//    public void setProperties(List<Property> properties) {
//        this.properties = properties;
//    }

    public Seller(String firstName, String surName) {
        this.firstName = firstName;
        this.surName = surName;
    }

    public Seller() {
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
