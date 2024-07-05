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
    private String surname;


    private List<PropertyDTO> properties = new ArrayList<>();

    public SellerDto(Seller seller){
        this.id = seller.getId();
        this.firstName=seller.getfirstName();
        this.surname= seller.getSurname();
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

    public SellerDto(String firstName, String surname) {
        this.firstName = firstName;
        this.surname = surname;
    }

    public SellerDto() {
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
