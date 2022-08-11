package com.paloit.training.sp01.model;

import com.fasterxml.jackson.annotation.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

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

    private Integer size;

//     @JsonManagedReference
    // mapped by entity
    @OneToMany(mappedBy = "room")
    @JsonIgnoreProperties("room")
    private List<Booking> bookings;
}
