package com.pals.backend.dtos;

import com.pals.backend.entities.Property;
import com.pals.backend.entities.Seller;

public class PropertyDTO {

    private int id;
    private String imageURL;
    private String address;
    private int price;
    private int bedrooms;
    private int bathrooms;
    private boolean garden;
    private String saleStatus;
    // FOREIGN KEY
    // SaleStatusID;
    // FOREIGN KEY
//     SellerID;
//    private Seller seller;

    public PropertyDTO() {

    }

//    public PropertyDTO(com.pals.backend.entities.Seller seller) {
//        Seller = seller;
//    }

    public PropertyDTO(Property property) {
        this.id = property.getId();
        this.imageURL = property.getImageURL();
        this.address = property.getAddress();
        this.price = property.getPrice();
        this.bedrooms = property.getBedrooms();
        this.bathrooms = property.getBathrooms();
        this.garden = property.isGarden();
        this.saleStatus = property.getSaleStatus();
//        this.seller = property.getSeller();
    }

    public PropertyDTO(int id, String imageURL, String address, int price, int bedrooms, int bathrooms, boolean garden, String saleStatus, Seller seller) {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getBedrooms() {
        return bedrooms;
    }

    public void setBedrooms(int bedrooms) {
        this.bedrooms = bedrooms;
    }

    public int getBathrooms() {
        return bathrooms;
    }

    public void setBathrooms(int bathrooms) {
        this.bathrooms = bathrooms;
    }

    public boolean isGarden() {
        return garden;
    }

    public void setGarden(boolean garden) {
        this.garden = garden;
    }

    public String getSaleStatus() {
        return saleStatus;
    }

    public void setSaleStatus(String saleStatus) {
        this.saleStatus = saleStatus;
    }

    @Override
    public String toString() {
        return "PropertyDTO{" +
                "propertyID=" + id +
                ", imageURL='" + imageURL + '\'' +
                ", address='" + address + '\'' +
                ", price=" + price +
                ", bedrooms=" + bedrooms +
                ", bathrooms=" + bathrooms +
                ", garden=" + garden +
                ", saleStatus='" + saleStatus + '\'' +
//                ", Seller=" + seller +
                '}';
    }
}