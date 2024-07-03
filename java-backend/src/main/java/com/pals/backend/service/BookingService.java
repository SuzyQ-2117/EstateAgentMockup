package com.pals.backend.service;

import com.pals.backend.dtos.BookingDto;
import com.pals.backend.entities.Booking;
import com.pals.backend.repos.BookingRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    private BookingRepo repo;


    public BookingService(BookingRepo repo) {
        this.repo = repo;
    }

    public ResponseEntity<Booking> createBooking(Booking newBooking) {
        Booking created = this.repo.save(newBooking);

        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    public List<BookingDto> getAll() {
        List<Booking> found =  this.repo.findAll();
        List<BookingDto> dtos = new ArrayList<>();


        for (Booking booking : found) {
            dtos.add(new BookingDto(booking));
        }

        return dtos;
    }


    public ResponseEntity<?> getBooking(Integer id) {
        if (!this.repo.existsById(id))
            return new ResponseEntity<>("No Booking found with id: " + id, HttpStatus.NOT_FOUND);

        Booking found = this.repo.findById(id).get();
        // missing not found logic
        return ResponseEntity.ok(new BookingDto(found));
    }

    //update booking
    public ResponseEntity<?> updateBooking(Integer id,
                                           LocalDateTime bookingDate

    ) {

        Optional<Booking> found = this.repo.findById(id);

        if (found.isEmpty()) return new ResponseEntity<>("No Booking found with id: " + id, HttpStatus.NOT_FOUND);

        Booking toUpdate = found.get();

        if (bookingDate != null) toUpdate.setBookingDate(bookingDate);

        Booking updated = this.repo.save(toUpdate);

        return ResponseEntity.ok(new BookingDto(updated));
    }


    //delete booking
    public ResponseEntity<?> removeBooking(Integer id) {
        if (!this.repo.existsById(id))
            return new ResponseEntity<>("No Booking found with id: " + id, HttpStatus.NOT_FOUND);

        Booking found = this.repo.findById(id).get();

        this.repo.deleteById(id);

        return ResponseEntity.ok(new BookingDto(found));
    }
}

