package com.pals.backend.dtos;

import com.pals.backend.entities.Booking;
import com.pals.backend.entities.Buyer;

import java.util.ArrayList;
import java.util.List;

public class BuyerDto {

    private Integer id;
    private String firstName;
    private String surname;

// ********* Replace Seller List with Prop List ********
    private List<BookingDto> bookings = new ArrayList<>();

    public List<BookingDto> getBookings() {
        return bookings;
    }

    public void setBookings(List<BookingDto> bookings) {
        this.bookings = bookings;
    }

    public BuyerDto(Buyer buyer){
    this.id = buyer.getId();
    this.firstName = buyer.getfirstName();
    this.surname = buyer.getSurname();
    if(buyer.getBookings() != null){
        for(Booking booking : buyer.getBookings()){
            this.bookings.add(new BookingDto(booking));
        }
    }
}

    public BuyerDto(Integer id, String firstName, String surname, List<BookingDto> bookings) {
        this.id = id;
        this.firstName = firstName;
        this.surname = surname;
        this.bookings = bookings;
    }

    public BuyerDto(Integer id, String firstName, String surname) {
        this.id = id;
        this.firstName = firstName;
        this.surname = surname;
    }

    public BuyerDto(String firstName, String surname) {
        this.firstName = firstName;
        this.surname = surname;
    }

    public BuyerDto() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getfirstName() {
        return firstName;
    }

    public void setfirstName(String firstName) {
        this.firstName = firstName;
    }

    @Override
    public String toString() {
        return "Buyer{" +
                "buyerId=" + id +
                ", firstName='" + firstName + '\'' +
                ", surname='" + surname + '\'' +
                '}';
    }
}
