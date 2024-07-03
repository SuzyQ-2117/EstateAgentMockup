package com.pals.backend.dtos;


import com.pals.backend.entities.Booking;

import java.time.LocalDateTime;

public class BookingDto {

    private Integer id;

    private LocalDateTime bookingDate;

    //default constructor
    public BookingDto() {
        super();
    }


    //generated constructor including adding in from booking entity
    public BookingDto(Booking booking) {
        this.id = booking.getId();
        this.bookingDate = booking.getBookingDate();
    }

    //generated constructors
    public BookingDto(Integer id, LocalDateTime bookingDate) {
        this.id = id;
        this.bookingDate = bookingDate;
    }

    // generated getters and setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDateTime getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }
}