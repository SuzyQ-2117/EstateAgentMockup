package com.pals.backend.dtos;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.pals.backend.entities.Booking;

import java.time.LocalDate;



public class BookingDto {

    private Integer id;
    private LocalDate bookingDate;
    private String bookingTime;
    private String address;
    private String buyer;


    //default constructor
    public BookingDto() {
        super();
    }

    //generated constructor including adding in from booking entity
    public BookingDto(Booking booking) {
        this.id = booking.getId();
        this.bookingDate = booking.getBookingDate();
        this.bookingTime = booking.getBookingTime();
        this.address = booking.getProperty().getAddress();
        this.buyer = booking.getBuyer().getfirstName()+" "+booking.getBuyer().getSurname();
    }

    //generated constructors


    public BookingDto(Integer id, LocalDate bookingDate, String bookingTime, String address, String buyer) {
        this.id = id;
        this.bookingDate = bookingDate;
        this.bookingTime = bookingTime;
        this.address = address;
        this.buyer = buyer;
    }

    public BookingDto(Integer id, LocalDate bookingDate, String bookingTime) {
        this.id = id;
        this.bookingDate = bookingDate;
        this.bookingTime= bookingTime;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getBuyer() {
        return buyer;
    }

    public void setBuyer(String buyer) {
        this.buyer = buyer;
    }

    // generated getters and setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }

    public String getBookingTime() {
        return bookingTime;
    }

    public void setBookingTime(String bookingTime) {
        this.bookingTime = bookingTime;
    }
}
