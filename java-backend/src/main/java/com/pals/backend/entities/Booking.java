package com.pals.backend.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Booking {

    @Id // sets field as Primary Key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // sets to auto increment
    private Integer id;

    //@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss[.SSS][.SS][.S]")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate bookingDate;

    private String bookingTime;

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
    public Booking(Integer id, LocalDate bookingDate, String bookingTime) {
        this.id = id;
        this.bookingDate = bookingDate;
        this.bookingTime = bookingTime;
    }

    public Booking(Integer id, LocalDate bookingDate, String bookingTime, Buyer buyer) {
        this.id = id;
        this.bookingDate = bookingDate;
        this.bookingTime = bookingTime;
        this.buyer = buyer;
    }



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

    @Override
    public String toString() {
        return "Booking{" +
                "id=" + id +
                ", bookingDate=" + bookingDate +
                ", bookingTime=" + bookingTime +
                '}';
    }
}

