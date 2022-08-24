package com.paloit.training.sp01.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "room")
public class Room {
    @Id
    @GeneratedValue
    @Column(name = "room_id")
    private UUID roomId;

    private String name;
    private Integer size;

    // KEPT IT FOR REFERENCE
    // @JsonManagedReference

    // mapped by entity
    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("room")
    private List<Booking> bookings;
}
