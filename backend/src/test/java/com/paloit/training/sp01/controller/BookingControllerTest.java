package com.paloit.training.sp01.controller;

import com.paloit.training.sp01.model.Booking;
import com.paloit.training.sp01.model.Room;
import com.paloit.training.sp01.model.User;
import com.paloit.training.sp01.model.request.UpdateUserBookingRequest;
import com.paloit.training.sp01.repository.BookingRepository;
import com.paloit.training.sp01.repository.RoomRepository;
import com.paloit.training.sp01.repository.UserRepository;
import io.restassured.RestAssured;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.filter.log.ResponseLoggingFilter;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import java.time.Instant;
import java.util.UUID;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasSize;

@Slf4j
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class BookingControllerTest {

    @Autowired
    RoomRepository roomRepo;
    @Autowired
    UserRepository userRepo;
    @Autowired
    BookingRepository bookingRepo;
    @LocalServerPort
    private int port;
    private Booking testBooking;

    @BeforeAll
    public void beforeAll() {
        RestAssured.baseURI = "http://localhost:" + port;
        RestAssured.filters(new RequestLoggingFilter(), new ResponseLoggingFilter());
    }

    @BeforeEach
    public void beforeEach() {
        User user = userRepo.findByEmail("xxx@example.com").orElse(new User());
        user.setEmail("xxx@example.com");
        user.setPassword("password");
        user.setFirstName("Test");
        user.setLastName("User");
        userRepo.save(user);

        Room room = new Room();
        room.setSize(15);
        room.setName("A001");
        roomRepo.save(room);

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setRoom(room);
        booking.setStartTime(Instant.parse("2022-08-08T13:00:00Z"));
        booking.setEndTime(Instant.parse("2022-08-08T14:00:00Z"));
        booking.setStatus("reserved");
        booking.setBookingNumber("BA00001");
        testBooking = bookingRepo.save(booking);
    }

    @AfterEach
    public void afterEach() {
        // order to delete is mattered
        bookingRepo.deleteAll();
        roomRepo.deleteAll();
        userRepo.deleteAll();
    }

    @Test
    public void updateBooking_BookingExists_ReturnedSuccessfully_200() {
        UpdateUserBookingRequest updateBooking = new UpdateUserBookingRequest();
        updateBooking.setStatus("cancelled");

        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .body(updateBooking)
                .when()
                .put("/api/bookings/{bookingId}", testBooking.getBookingId())
                .then()
                .statusCode(HttpStatus.OK.value())
                .and()
                .body("status", equalTo("cancelled"));
    }

    @Test
    public void updateBooking_BookingNotExists_ReturnedSuccessfully_404() {
        UpdateUserBookingRequest updateBooking = new UpdateUserBookingRequest();
        updateBooking.setStatus("cancelled");

        given().log().all().with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .body(updateBooking)
                .when()
                .put("/api/bookings/{bookingId}", UUID.randomUUID())
                .then()
                .assertThat()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }
}
