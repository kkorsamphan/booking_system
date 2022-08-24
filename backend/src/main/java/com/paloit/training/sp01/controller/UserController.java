package com.paloit.training.sp01.controller;

import com.paloit.training.sp01.exception.BookingAlreadyExistsException;
import com.paloit.training.sp01.exception.RoomNotFoundException;
import com.paloit.training.sp01.exception.UserNotFoundException;
import com.paloit.training.sp01.model.Booking;
import com.paloit.training.sp01.model.Room;
import com.paloit.training.sp01.model.User;
import com.paloit.training.sp01.model.request.CreateUserBookingRequest;
import com.paloit.training.sp01.model.request.UpdateUserBookingRequest;
import com.paloit.training.sp01.service.BookingService;
import com.paloit.training.sp01.service.RoomService;
import com.paloit.training.sp01.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;
    private final RoomService roomService;
    private final BookingService bookingService;

    public UserController(
            UserService userService,
            RoomService roomService,
            BookingService bookingService
    ) {
        this.userService = userService;
        this.roomService = roomService;
        this.bookingService = bookingService;
    }

    @DeleteMapping("/users/{email}")
    public ResponseEntity<Object> deleteUser(@PathVariable String email) {
        try {
            userService.deleteUserByEmail(email);
            return ResponseEntity.ok().build();

        } catch (UserNotFoundException exc){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "User not found.", exc);
        }
    }

    @GetMapping("/users/{userId}/bookings")
    public ResponseEntity<List<Booking>> getUserBookingById(@PathVariable UUID userId) {
        try {
            List<Booking> result = userService.getUserBookings(userId);
            return ResponseEntity.ok(result);

        } catch (UserNotFoundException exc){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "User not found.", exc);
        }
    }

    @PostMapping("/users/{userId}/bookings")
    public ResponseEntity<Booking> createUserBooking(
            @PathVariable UUID userId,
            @RequestBody CreateUserBookingRequest request
    ) {
        try {
            var bookingStartTime = Instant.parse(request.getStartTime());
            var bookingEndTime = Instant.parse(request.getEndTime());

            User user = userService.getUserById(userId);
            Room room = roomService.getRoomById(request.getRoomId());
            bookingService.CheckExistedBookingsByRoomAndTime(
                    room.getRoomId(),
                    bookingStartTime,
                    bookingEndTime);

            Booking newBooking = bookingService.createBooking(
                    user,
                    room,
                    bookingStartTime,
                    bookingEndTime);
            return ResponseEntity.ok(newBooking);

        } catch (UserNotFoundException exc){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "User not found.", exc);
        } catch (RoomNotFoundException exc){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Room not found.", exc);
        } catch (BookingAlreadyExistsException exc){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "The requested room and time has been booked.", exc);
        }
    }
}

