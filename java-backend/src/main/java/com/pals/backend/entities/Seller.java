package com.pals.backend.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Seller {

    @Id
    @GeneratedValue (strategy= GenerationType.IDENTITY)
    private int id;
    private String firstName;
    private String surname;

    @OneToMany(mappedBy = "seller")
    private List<Property> properties;

    public List<Property> getProperties() {
        return properties;
    }

    public void setProperties(List<Property> properties) {
        this.properties = properties;
    }

    public Seller(String firstName, String surname) {
        this.firstName = firstName;
        this.surname = surname;
    }

    public Seller() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getfirstName() {
        return firstName;
    }




    public void setfirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    @Override
    public String toString() {
        return "Seller{" +
                "sellerId=" + id +
                ", firstName='" + firstName + '\'' +
                ", surname='" + surname + '\'' +
                '}';
    }
}
