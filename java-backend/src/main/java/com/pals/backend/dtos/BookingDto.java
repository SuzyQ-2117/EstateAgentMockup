package com.pals.backend.dtos;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.pals.backend.entities.Booking;

import java.time.LocalDate;



public class BookingDto {

    private Integer id;
    private LocalDate bookingDate;
    private String bookingTime;

    //default constructor
    public BookingDto() {
        super();
    }

    //generated constructor including adding in from booking entity
    public BookingDto(Booking booking) {
        this.id = booking.getId();
        this.bookingDate = booking.getBookingDate();
        this.bookingTime = booking.getBookingTime();
    }

    //generated constructors
    public BookingDto(Integer id, LocalDate bookingDate, String bookingTime) {
        this.id = id;
        this.bookingDate = bookingDate;
        this.bookingTime= bookingTime;
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
