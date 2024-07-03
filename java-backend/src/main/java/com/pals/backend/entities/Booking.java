package com.pals.backend.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Booking {

    @Id // sets field as Primary Key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // sets to auto increment
    private Integer id;

    private LocalDateTime bookingDate;
    @ManyToOne
private Buyer buyer;

    public Buyer getBuyer() {
        return buyer;
    }

    public void setBuyer(Buyer buyer) {
        this.buyer = buyer;
    }

    // REQUIRED default constructor
    public Booking() {
        super();
    }
    public Booking(Integer id, LocalDateTime bookingDate) {
        this.id = id;
        this.bookingDate = bookingDate;
    }

    public Booking(Integer id, LocalDateTime bookingDate, Buyer buyer) {
        this.id = id;
        this.bookingDate = bookingDate;
        this.buyer = buyer;
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