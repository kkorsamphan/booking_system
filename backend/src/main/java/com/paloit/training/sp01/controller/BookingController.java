package com.paloit.training.sp01.controller;

import com.paloit.training.sp01.exception.BookingNotFoundException;
import com.paloit.training.sp01.model.Booking;
import com.paloit.training.sp01.model.request.UpdateUserBookingRequest;
import com.paloit.training.sp01.service.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PutMapping("/bookings/{bookingId}")
    public ResponseEntity<Booking> updateBooking(
            @PathVariable UUID bookingId,
            @RequestBody UpdateUserBookingRequest request
    ) {
        try {
            Booking booking = bookingService.updateBookingStatus(
                    bookingId, request.getStatus());
            return ResponseEntity.ok(booking);

        } catch (BookingNotFoundException exc) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Booking not found.", exc);
        }
    }
}
