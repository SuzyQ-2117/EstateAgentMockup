package com.pals.backend.rest;

import com.pals.backend.dtos.BookingDto;
import com.pals.backend.entities.Booking;
import com.pals.backend.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@CrossOrigin
@RestController
@RequestMapping(value="booking")
public class BookingController {
    private BookingService service;

    public BookingController(BookingService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBooking(@PathVariable Integer id) {
        return this.service.getBooking(id);
    }

    @GetMapping("/all")
    public List<BookingDto> getAll() {
        return this.service.getAll();
    }

    @PostMapping("/new")
    public ResponseEntity<Booking> createBooking(@RequestBody Booking newBooking) {
        return this.service.createBooking(newBooking);
    }


    @PatchMapping("/{id}")
    public ResponseEntity<?> updateBooking(@PathVariable(name = "id") Integer id,
                                           @RequestParam(name = "bookingDate", required = false) LocalDate bookingDate,
                                             @RequestParam(name = "bookingTime", required = false) String bookingTime

    ) {
        return this.service.updateBooking(id, bookingDate, bookingTime);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> removeBooking(@PathVariable Integer id) {
        return this.service.removeBooking(id);
    }

}

