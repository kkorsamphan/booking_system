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
            "WHERE NOT EXISTS (" +
                "SELECT bk.room.roomId " +
                "FROM Booking bk " +
                "WHERE bk.status IN ('reserved', 'completed') " +
                "AND (" +
                    "(:startTime > bk.startTime OR :endTime > bk.startTime) " +
                    "AND (:startTime < bk.endTime OR :endTime <  bk.endTime)" +
                ") " +
                "AND bk.room.roomId = r.roomId" +
            ") " +
            "AND r.size >= :roomSize"
    )

    List<Room> findAvailableRooms(
            @Param("roomSize") Integer roomSize,
            @Param("startTime") Instant startTime,
            @Param("endTime") Instant endTime
    );
}
