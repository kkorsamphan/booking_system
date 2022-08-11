package com.paloit.training.sp01.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.paloit.training.sp01.model.Booking;
import com.paloit.training.sp01.model.Room;
import com.paloit.training.sp01.model.User;
import com.paloit.training.sp01.model.request.CreateUserBookingPayload;
import com.paloit.training.sp01.model.request.CreateUserPayload;
import com.paloit.training.sp01.model.request.LoginUserPayload;
import com.paloit.training.sp01.repository.BookingRepository;
import com.paloit.training.sp01.repository.RoomRepository;
import com.paloit.training.sp01.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class UserController {

    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;

    public UserController(UserRepository userRepository, BookingRepository bookingRepository, RoomRepository roomRepository) {
        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
        this.roomRepository = roomRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser (@RequestBody LoginUserPayload payload) {
        Optional<User> userOpt = userRepository.findByEmail(payload.getEmail());
        if (userOpt.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        User user = userOpt.get();
        Boolean validateLogin = user.getPassword().equals(payload.getPassword());
        if (!validateLogin) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        return ResponseEntity.ok(user);
    }

    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestBody CreateUserPayload user) {

        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setPassword(user.getPassword());
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());

        userRepository.save(newUser);

        return ResponseEntity.ok(newUser);
    }

    @GetMapping("/users/{userId}/bookings")
    public ResponseEntity<List<Booking>> getUserBookingById(@PathVariable UUID userId) {
        List<Booking> result = new ArrayList<>();

        Optional<User> userOpt = userRepository.findById(userId);

        if (userOpt.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        userOpt.ifPresent(user -> {
            result.addAll(user.getBookings());
        });

        return ResponseEntity.ok(result);
    }

    @PostMapping("/users/{userId}/bookings")
    public ResponseEntity<Booking> createUserBooking(@PathVariable UUID userId, @RequestBody CreateUserBookingPayload bookingRequest) {
        var bookingStartTime = Instant.parse(bookingRequest.getStartTime());
        var bookingEndTime = Instant.parse(bookingRequest.getEndTime());

        Booking newBooking = new Booking();
        newBooking.setStartTime(bookingStartTime);
        newBooking.setEndTime(bookingEndTime);

        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        userOpt.ifPresent(user -> {
            newBooking.setUser(user);
        });

        Optional<Room> roomOpt = roomRepository.findById(bookingRequest.getRoomId());
        if (roomOpt.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        var roomBookingCount = bookingRepository.countBookingsByRoomId(bookingRequest.getRoomId(), bookingStartTime, bookingEndTime);
        if (roomBookingCount > 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        roomOpt.ifPresent(room -> {
            newBooking.setRoom(room);
        });

        bookingRepository.save(newBooking);

        return ResponseEntity.ok(newBooking);
    }
}

