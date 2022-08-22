package com.paloit.training.sp01.service;

import com.paloit.training.sp01.exception.RoomNotFoundException;
import com.paloit.training.sp01.model.Booking;
import com.paloit.training.sp01.model.Room;
import com.paloit.training.sp01.model.request.CreateRoomRequest;
import com.paloit.training.sp01.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.UUID;

@Service
public class RoomService {

    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public ArrayList<Room> getAvailableRooms(
            Integer roomSize,
            Instant bookingStartTime,
            Instant bookingEndTime) {

        return new ArrayList<>(
                roomRepository.findAvailableRooms(roomSize, bookingStartTime, bookingEndTime));
    }

    public Room getRoomById(UUID roomId) {
        return roomRepository.findById(roomId)
                .orElseThrow(() -> {
                    throw new RoomNotFoundException("Room not found.");
                });
    }

    public Room createRoom(CreateRoomRequest request) {
        Room newRoom = new Room();
        newRoom.setSize(request.getSize());
        newRoom.setName(request.getName());

        return roomRepository.save(newRoom);
    }

    public ArrayList<Booking> getRoomBookings(UUID userId) {

        Room room =  roomRepository.findById(userId)
                .orElseThrow(() -> {
                    throw new RoomNotFoundException("Room not found.");
                });

        return new ArrayList<>(room.getBookings());
    }
}
