package com.paloit.training.sp01.repository;

import com.paloit.training.sp01.model.Booking;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.UUID;

@Repository
public interface BookingRepository extends PagingAndSortingRepository<Booking, UUID> {

    @Query("" +
            "SELECT COUNT(bk) " +
            "FROM Booking bk " +
            "WHERE bk.room.roomId = :roomId " +
            "AND bk.status IN ('reserved', 'completed') " +
            "AND (" +
                "( :startTime > bk.startTime OR :endTime > bk.startTime )  " +
                "AND ( :startTime < bk.endTime OR :endTime < bk.endTime )" +
            ")"
    )

    Long countBookingsByRoomId(
            @Param("roomId") UUID roomId,
            @Param("startTime") Instant startTime,
            @Param("endTime") Instant endTime
    );
}
