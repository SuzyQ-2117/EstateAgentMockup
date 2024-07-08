package com.pals.backend.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Buyer {

    @Id
    @GeneratedValue (strategy= GenerationType.IDENTITY)
    private Integer id;
    private String firstName;
    private String surname;

    @OneToMany(mappedBy = "buyer")
    private List<Booking> bookings;



    public Buyer(String firstName, String surname) {
        this.firstName = firstName;
        this.surname = surname;
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }

    public Buyer() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getfirstName() {
        return firstName;
    }

    public void setfirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
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
