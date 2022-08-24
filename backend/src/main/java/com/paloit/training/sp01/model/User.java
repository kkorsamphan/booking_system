package com.paloit.training.sp01.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "user_account")
@JsonIgnoreProperties({"password"})
public class User {
    @Id
    // KEPT IT FOR REFERENCE
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
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("user")
    private List<Booking> bookings;
}
