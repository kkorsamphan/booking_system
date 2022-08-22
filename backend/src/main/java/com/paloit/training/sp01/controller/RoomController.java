package com.paloit.training.sp01.controller;

import com.paloit.training.sp01.exception.RoomNotFoundException;
import com.paloit.training.sp01.model.Booking;
import com.paloit.training.sp01.model.Room;
import com.paloit.training.sp01.model.request.CreateRoomRequest;
import com.paloit.training.sp01.service.RoomService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping("/rooms")
    public ResponseEntity<ArrayList<Room>> getAvailableRooms(
            @RequestParam Integer roomSize,
            @RequestParam String startTime,
            @RequestParam String endTime
    ) {

        var response = roomService.getAvailableRooms(roomSize, Instant.parse(startTime), Instant.parse(endTime));
        return ResponseEntity.ok(response);
    }

    @PostMapping("/rooms")
    public ResponseEntity<Room> createRoom(@RequestBody CreateRoomRequest room) {

        Room newRoom = roomService.createRoom(room);
        return ResponseEntity.ok(newRoom);
    }

    @GetMapping("/rooms/{roomId}/bookings")
    public ResponseEntity<List<Booking>> getRoomBookingsById(@PathVariable UUID roomId) {
        try {
            List<Booking> result = roomService.getRoomBookings(roomId);
            return ResponseEntity.ok(result);

        } catch (RoomNotFoundException exc){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Room not found.", exc);
        }
    }
}
