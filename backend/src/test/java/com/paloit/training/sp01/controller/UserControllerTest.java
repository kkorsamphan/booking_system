package com.paloit.training.sp01.controller;

import com.paloit.training.sp01.model.Booking;
import com.paloit.training.sp01.model.Room;
import com.paloit.training.sp01.model.User;
import com.paloit.training.sp01.model.request.CreateUserBookingRequest;
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
import static org.junit.jupiter.api.Assertions.assertEquals;

@Slf4j
//@Sql({"/scripts/setup.sql"})
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class UserControllerTest {

    @Autowired
    RoomRepository roomRepo;
    @Autowired
    UserRepository userRepo;
    @Autowired
    BookingRepository bookingRepo;
    @LocalServerPort
    private int port;
    private User testUser;
    private Room testRoom;
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
        testUser = userRepo.save(user);

        Room room = new Room();
        room.setSize(15);
        room.setName("A001");
        testRoom = roomRepo.save(room);

        Booking booking = new Booking();
        booking.setUser(testUser);
        booking.setRoom(testRoom);
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
    public void getUserBookingById_UserExists_ReturnedSuccessfully_200() {
        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .when()
                .get("/api/users/{userId}/bookings", testUser.getUserId())
                .then()
                .statusCode(HttpStatus.OK.value())
                .and()
                .body("$", hasSize(1))
                .body("[0].bookingId", equalTo(testBooking.getBookingId().toString()))
                .body("[0].startTime", equalTo(testBooking.getStartTime().toString()))
                .body("[0].endTime", equalTo(testBooking.getEndTime().toString()))
                .body("[0].room.roomId", equalTo(testBooking.getRoom().getRoomId().toString()))
                .body("[0].room.size", equalTo(testBooking.getRoom().getSize()));
    }

    @Test
    public void getUserBookingById_UserNotExists_ReturnedSuccessfully_404() {
        given().log().all().with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .when()
                .get("/api/users/{userId}/bookings", UUID.randomUUID())
                .then()
                .assertThat()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }

    @Test
    public void createUserBooking_BookBefore_ReturnedSuccessfully_200() {
        CreateUserBookingRequest newBooking = new CreateUserBookingRequest();
        newBooking.setRoomId(testRoom.getRoomId());
        newBooking.setStartTime("2022-08-08T11:00:00Z");
        newBooking.setEndTime("2022-08-08T12:00:00Z");

        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .body(newBooking)
                .when()
                .post("/api/users/{userId}/bookings", testUser.getUserId())
                .then()
                .statusCode(HttpStatus.OK.value());

        var bookingCount = bookingRepo.count();
        assertEquals(2, bookingCount);
    }

    @Test
    public void createUserBooking_BookAfter_ReturnedSuccessfully_200() {
        CreateUserBookingRequest newBooking = new CreateUserBookingRequest();
        newBooking.setRoomId(testRoom.getRoomId());
        newBooking.setStartTime("2022-08-08T16:00:00Z");
        newBooking.setEndTime("2022-08-08T17:00:00Z");

        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .body(newBooking)
                .when()
                .post("/api/users/{userId}/bookings", testUser.getUserId())
                .then()
                .statusCode(HttpStatus.OK.value());

        var bookingCount = bookingRepo.count();
        assertEquals(2, bookingCount);
    }

    @Test
    public void createUserBooking_BookingStartTimeOverlapWithEndTime_ReturnedSuccessfully_200() {
        CreateUserBookingRequest newBooking = new CreateUserBookingRequest();
        newBooking.setRoomId(testRoom.getRoomId());
        newBooking.setStartTime("2022-08-08T14:00:00Z");
        newBooking.setEndTime("2022-08-08T15:00:00Z");

        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE).body(newBooking)
                .when().post("/api/users/{userId}/bookings", testUser.getUserId())
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value());
    }

    @Test
    public void createUserBooking_BookingEndTimeOverlapWithStartTime_ReturnedSuccessfully_200() {
        CreateUserBookingRequest newBooking = new CreateUserBookingRequest();
        newBooking.setRoomId(testRoom.getRoomId());
        newBooking.setStartTime("2022-08-08T12:00:00Z");
        newBooking.setEndTime("2022-08-08T13:00:00Z");

        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE).body(newBooking)
                .when().post("/api/users/{userId}/bookings", testUser.getUserId())
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value());
    }

    @Test
    public void createUserBooking_UserNotExists_ReturnedSuccessfully_404() {
        CreateUserBookingRequest newBooking = new CreateUserBookingRequest();
        newBooking.setRoomId(testRoom.getRoomId());
        newBooking.setStartTime("2022-08-08T16:00:00Z");
        newBooking.setEndTime("2022-08-08T17:00:00Z");

        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE).body(newBooking)
                .when()
                .post("/api/users/{userId}/bookings", UUID.randomUUID())
                .then()
                .assertThat()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }

    @Test
    public void createUserBooking_RoomNotExists_ReturnedSuccessfully_404() {
        CreateUserBookingRequest newBooking = new CreateUserBookingRequest();
        newBooking.setRoomId(UUID.randomUUID());
        newBooking.setStartTime("2022-08-08T16:00:00Z");
        newBooking.setEndTime("2022-08-08T17:00:00Z");

        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE).body(newBooking)
                .when()
                .post("/api/users/{userId}/bookings", testUser.getUserId())
                .then()
                .assertThat()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    public void createUserBooking_BookingSameTime_ReturnedSuccessfully_400() {
        CreateUserBookingRequest newBooking = new CreateUserBookingRequest();
        newBooking.setRoomId(testRoom.getRoomId());
        newBooking.setStartTime("2022-08-08T13:00:00Z");
        newBooking.setEndTime("2022-08-08T14:00:00Z");

        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE).body(newBooking)
                .when().post("/api/users/{userId}/bookings", testUser.getUserId())
                .then()
                .assertThat()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    public void createUserBooking_BookingTimeOverlap_ReturnedSuccessfully_400() {
        CreateUserBookingRequest newBooking = new CreateUserBookingRequest();
        newBooking.setRoomId(testRoom.getRoomId());
        newBooking.setStartTime("2022-08-08T12:00:00Z");
        newBooking.setEndTime("2022-08-08T16:00:00Z");

        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE).body(newBooking)
                .when().post("/api/users/{userId}/bookings", testUser.getUserId())
                .then()
                .assertThat()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    public void createUserBooking_BookingTimeOverlapWithin_ReturnedSuccessfully_400() {
        CreateUserBookingRequest newBooking = new CreateUserBookingRequest();
        newBooking.setRoomId(testRoom.getRoomId());
        newBooking.setStartTime("2022-08-08T13:30:00Z");
        newBooking.setEndTime("2022-08-08T13:45:00Z");

        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE).body(newBooking)
                .when().post("/api/users/{userId}/bookings", testUser.getUserId())
                .then()
                .assertThat()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    public void createUserBooking_BookingTimeOverlapStartTime_ReturnedSuccessfully_400() {
        CreateUserBookingRequest newBooking = new CreateUserBookingRequest();
        newBooking.setRoomId(testRoom.getRoomId());
        newBooking.setStartTime("2022-08-08T12:30:00Z");
        newBooking.setEndTime("2022-08-08T13:30:00Z");

        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE).body(newBooking)
                .when().post("/api/users/{userId}/bookings", testUser.getUserId())
                .then()
                .assertThat()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    public void createUserBooking_BookingTimeOverlapEndTime_ReturnedSuccessfully_400() {
        CreateUserBookingRequest newBooking = new CreateUserBookingRequest();
        newBooking.setRoomId(testRoom.getRoomId());
        newBooking.setStartTime("2022-08-08T13:30:00Z");
        newBooking.setEndTime("2022-08-08T15:00:00Z");

        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE).body(newBooking)
                .when().post("/api/users/{userId}/bookings", testUser.getUserId())
                .then()
                .assertThat()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    public void deleteUser_UserExists_ReturnedSuccessfully_200() {
        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .when()
                .delete("/api/users/{email}", testUser.getEmail())
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value());
    }

    @Test
    public void deleteUser_UserNotExists_ReturnedSuccessfully_404() {
        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .when()
                .delete("/api/users/{email}", "non_user@example.com")
                .then()
                .assertThat()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }

}
