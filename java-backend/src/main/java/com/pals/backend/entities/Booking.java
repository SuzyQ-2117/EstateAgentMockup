package com.pals.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Booking {

    @Id // sets field as Primary Key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // sets to auto increment
    private Integer id;

    private LocalDateTime bookingDate;

    // REQUIRED default constructor
    public Booking() {
        super();
    }
    public Booking(Integer id, LocalDateTime bookingDate) {
        this.id = id;
        this.bookingDate = bookingDate;
    }

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



    @Override
    public String toString() {
        return "Booking{" +
                "id=" + id +
                ", bookingDate=" + bookingDate +
                '}';
    }
}
