package com.paloit.training.sp01.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Data
@Entity
@Table(name = "booking")
public class Booking {
    @Id
    @GeneratedValue
    @Column(name = "booking_id")
    private UUID bookingId;

    private Instant startTime;
    private Instant endTime;
    private String status;
    private String bookingNumber;

    @JsonBackReference
    // KEPT IT FOR REFERENCE
    // @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // KEPT IT FOR REFERENCE
    // @JsonBackReference
    // @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    @JsonIgnoreProperties("bookings")
    private Room room;
}
