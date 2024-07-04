package com.pals.backend.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Seller {

    @Id
    @GeneratedValue (strategy= GenerationType.IDENTITY)
    private int id;
    private String firstName;
    private String surName;

    @OneToMany(mappedBy = "seller")
    private List<Property> properties;

    public List<Property> getProperties() {
        return properties;
    }

    public void setProperties(List<Property> properties) {
        this.properties = properties;
    }

    public Seller(String firstName, String surName) {
        this.firstName = firstName;
        this.surName = surName;
    }

    public Seller() {
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
