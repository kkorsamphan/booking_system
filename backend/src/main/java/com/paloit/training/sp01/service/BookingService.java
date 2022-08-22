package com.paloit.training.sp01.service;

import com.paloit.training.sp01.exception.BookingAlreadyExistsException;
import com.paloit.training.sp01.exception.BookingNotFoundException;
import com.paloit.training.sp01.model.Booking;
import com.paloit.training.sp01.model.Room;
import com.paloit.training.sp01.model.User;
import com.paloit.training.sp01.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {

        this.bookingRepository = bookingRepository;
    }

    public void CheckExistedBookingsByRoomAndTime (
            UUID roomId,
            Instant startTime,
            Instant endTime) {

        var roomBookingCount = bookingRepository.countBookingsByRoomId(roomId, startTime, endTime);
        if (roomBookingCount > 0) {
            throw new BookingAlreadyExistsException("The requested room and booking time has been booked.");
        }
    }

    public Booking createBooking(User user, Room room, Instant startTime, Instant endTime) {
        var bookingCurrentCount = bookingRepository.count() + 1;
        var bookingNumber = String.format("%05d", bookingCurrentCount);

        Booking newBooking = new Booking();
        newBooking.setUser(user);
        newBooking.setRoom(room);
        newBooking.setStartTime(startTime);
        newBooking.setEndTime(endTime);
        newBooking.setStatus("reserved");
        newBooking.setBookingNumber("BA" + bookingNumber);

        bookingRepository.save(newBooking);
        return newBooking;
    }

    public Booking updateBookingStatus(UUID bookingId, String status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> {
                    throw new BookingNotFoundException("Booking not found.");
                });
        booking.setStatus(status);
        bookingRepository.save(booking);

        return booking;
    }
}
