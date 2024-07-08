package com.pals.backend.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Property {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;
    //LGS updated from propertyID to id due to mapping into booking table as property_propertyid when foreign key added
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
    @ManyToOne
     private Seller seller;

//LGS adding in a property can have many bookings mapping and an array to hold the bookings
    @OneToMany(mappedBy="property")
    private List<Booking> bookings;


    public Property() {
    }

    //LGS generated getter and setter for id and also bookings array to hold the bookings
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
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

    public Seller getSeller() {
        return seller;
    }

    public void setSeller(Seller seller) {
        this.seller = seller;
    }

    @Override
    public String toString() {
        return "Property{" +
                "propertyID=" + id+
                ", imageURL='" + imageURL + '\'' +
                ", address='" + address + '\'' +
                ", price=" + price +
                ", bedrooms=" + bedrooms +
                ", bathrooms=" + bathrooms +
                ", garden=" + garden +
                ", saleStatus='" + saleStatus + '\'' +
                ", seller=" + seller +
                '}';
    }
}
