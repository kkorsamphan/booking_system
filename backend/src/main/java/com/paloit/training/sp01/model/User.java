package com.paloit.training.sp01.model;

import com.fasterxml.jackson.annotation.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "user_account")
@JsonIgnoreProperties({ "password" })
public class User {
    @Id
    // @GeneratedValue(generator = "UUID")
    // @GenericGenerator(
    //         name = "UUID",
    //         strategy = "org.hibernate.id.UUIDGenerator"
    // )
    @GeneratedValue
    private UUID userId;

    @Column(unique = true)
    private String email;

    private String password;

    private String firstName;

    private String lastName;

    @JsonManagedReference
    @OneToMany(mappedBy = "user")
    @JsonIgnoreProperties("user")
    private List<Booking> bookings;
}
