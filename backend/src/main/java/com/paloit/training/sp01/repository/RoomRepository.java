package com.paloit.training.sp01.repository;

import com.paloit.training.sp01.model.Room;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Repository
public interface RoomRepository extends PagingAndSortingRepository<Room, UUID> {
    @Query("" +
            "SELECT DISTINCT r " +
            "FROM Room r " +
            "LEFT JOIN r.bookings bk " +
            "WHERE r.size >= :roomSize " +
            "AND ( " +
                "bk IS NULL " +
                "OR bk.startTime >= :endTime " +
                "OR bk.endTime <= :startTime " +
                "OR bk.status NOT IN ('reserved', 'completed')" +
            ")"
    )
    List<Room> findAvailableRooms(
            @Param("roomSize") Integer roomSize,
            @Param("startTime") Instant startTime,
            @Param("endTime") Instant endTime
    );
}
