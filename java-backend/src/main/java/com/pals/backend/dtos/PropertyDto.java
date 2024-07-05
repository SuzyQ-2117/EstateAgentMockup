package com.pals.backend.dtos;

import com.pals.backend.entities.Property;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


public class PropertyDto {

    private int propertyID;
    private String ImageURL;
    private String Address;
    private int Price;
    private int Bedrooms;
    private int Bathrooms;
    private boolean Garden;
    private String SaleStatus;
    // FOREIGN KEY
    // SaleStatusID;
    // FOREIGN KEY
    // SellerID;


    public PropertyDto(Property prop) {
    }

    public int getPropertyID() {
        return propertyID;
    }

    public void setPropertyID(int propertyID) {
        this.propertyID = propertyID;
    }

    public String getImageURL() {
        return ImageURL;
    }

    public void setImageURL(String imageURL) {
        ImageURL = imageURL;
    }

    public String getAddress() {
        return Address;
    }

    public void setAddress(String address) {
        Address = address;
    }

    public int getPrice() {
        return Price;
    }

    public void setPrice(int price) {
        Price = price;
    }

    public int getBedrooms() {
        return Bedrooms;
    }

    public void setBedrooms(int bedrooms) {
        Bedrooms = bedrooms;
    }

    public int getBathrooms() {
        return Bathrooms;
    }

    public void setBathrooms(int bathrooms) {
        Bathrooms = bathrooms;
    }

    public boolean isGarden() {
        return Garden;
    }

    public void setGarden(boolean garden) {
        Garden = garden;
    }

    public String getSaleStatus() {
        return SaleStatus;
    }

    public void setSaleStatus(String saleStatus) {
        SaleStatus = saleStatus;
    }

    @Override
    public String toString() {
        return "Property{" +
                "propertyID=" + propertyID +
                ", ImageURL='" + ImageURL + '\'' +
                ", Address='" + Address + '\'' +
                ", Price=" + Price +
                ", Bedrooms=" + Bedrooms +
                ", Bathrooms=" + Bathrooms +
                ", Garden=" + Garden +
                ", SaleStatus='" + SaleStatus + '\'' +
                '}';
    }
}