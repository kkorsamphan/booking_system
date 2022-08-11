package com.paloit.training.sp01.controller;

import com.paloit.training.sp01.model.Booking;
import com.paloit.training.sp01.model.Room;
import com.paloit.training.sp01.model.User;
import com.paloit.training.sp01.model.request.CreateUserBookingPayload;
import com.paloit.training.sp01.model.request.CreateUserPayload;
import com.paloit.training.sp01.model.request.LoginUserPayload;
import com.paloit.training.sp01.repository.BookingRepository;
import com.paloit.training.sp01.repository.RoomRepository;
import com.paloit.training.sp01.repository.UserRepository;
import com.paloit.training.sp01.util.FileReader;
import io.restassured.RestAssured;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.filter.log.ResponseLoggingFilter;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;

import java.time.Instant;
import java.util.UUID;

import static io.restassured.RestAssured.given;
import static net.javacrumbs.jsonunit.assertj.JsonAssertions.assertThatJson;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@Slf4j
//@Sql({"/scripts/setup.sql"})
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class UserControllerTest {

    @Autowired
    FileReader fileReader;

    @LocalServerPort
    private int port;

    @Autowired
    RoomRepository roomRepo;

    @Autowired
    UserRepository userRepo;

    @Autowired
    BookingRepository bookingRepo;

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
        testRoom = roomRepo.save(room);

        Booking booking = new Booking();
        booking.setUser(testUser);
        booking.setRoom(testRoom);
        booking.setStartTime(Instant.parse("2022-08-08T13:00:00Z"));
        booking.setEndTime(Instant.parse("2022-08-08T14:00:00Z"));
        testBooking = bookingRepo.save(booking);
    }

    @AfterEach
    public void afterEach(){
        // order to delete is mattered
        bookingRepo.deleteAll();
        roomRepo.deleteAll();
        userRepo.deleteAll();
    }

    @Test
    public void loginUser_ReturnedSuccessfully_200() {
        LoginUserPayload payload  = new LoginUserPayload();
        payload.setEmail("xxx@example.com");
        payload.setPassword("password");

        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .body(payload)
                .when().post("/api/login")
                .then()
                .statusCode(HttpStatus.OK.value());
    }

    @Test
    public void loginUser_UserNotExists_ReturnedSuccessfully_401() {
        LoginUserPayload payload  = new LoginUserPayload();
        payload.setEmail("newuser@example.com");
        payload.setPassword("password");

        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .body(payload)
                .when().post("/api/login")
                .then()
                .statusCode(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    public void loginUser_IncorrectPassword_ReturnedSuccessfully_401() {
        LoginUserPayload payload  = new LoginUserPayload();
        payload.setEmail("xxx@example.com");
        payload.setPassword("not_password");

        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .body(payload)
                .when().post("/api/login")
                .then()
                .statusCode(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    public void createUser_ReturnedSuccessfully_200() {
        CreateUserPayload newUser  = new CreateUserPayload();
        newUser.setFirstName("Kunlanit");
        newUser.setLastName("Korsamphan");
        newUser.setEmail("iamoyua@gmail.com");
        newUser.setPassword("password");

        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .body(newUser)
                .when().post("/api/register")
                .then()
                .statusCode(HttpStatus.OK.value());

        var userCount = userRepo.count();
        assertEquals(2, userCount);
    }

    @Test
    public void getUserBookingById_UserExists_ReturnedSuccessfully_200() {
        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .when().get("/api/users/{userId}/bookings", testUser.getUserId())
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
        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .when().get("/api/users/{userId}/bookings", UUID.randomUUID())
                .then()
                .assertThat()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }

    @Test
    public void createUserBooking_ReturnedSuccessfully_200() {
        CreateUserBookingPayload newBooking = new CreateUserBookingPayload();
        newBooking.setRoomId(testRoom.getRoomId());
        newBooking.setStartTime("2022-08-08T16:00:00Z");
        newBooking.setEndTime("2022-08-08T17:00:00Z");

        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .body(newBooking)
                .when().post("/api/users/{userId}/bookings", testUser.getUserId())
                .then()
                .statusCode(HttpStatus.OK.value());

        var bookingCount = bookingRepo.count();
        assertEquals(2, bookingCount);
    }

    @Test
    public void createUserBooking_UserNotExists_ReturnedSuccessfully_404() {
        CreateUserBookingPayload newBooking = new CreateUserBookingPayload();
        newBooking.setRoomId(testRoom.getRoomId());
        newBooking.setStartTime("2022-08-08T16:00:00Z");
        newBooking.setEndTime("2022-08-08T17:00:00Z");

        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .body(newBooking)
                .when().post("/api/users/{userId}/bookings", UUID.randomUUID())
                .then()
                .assertThat()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }

    @Test
    public void createUserBooking_RoomNotExists_ReturnedSuccessfully_404() {
        CreateUserBookingPayload newBooking = new CreateUserBookingPayload();
        newBooking.setRoomId(UUID.randomUUID());
        newBooking.setStartTime("2022-08-08T16:00:00Z");
        newBooking.setEndTime("2022-08-08T17:00:00Z");

        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .body(newBooking)
                .when().post("/api/users/{userId}/bookings", testUser.getUserId())
                .then()
                .assertThat()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }

    @Test
    public void createUserBooking_BookingOverlapped_ReturnedSuccessfully_400() {
        CreateUserBookingPayload newBooking = new CreateUserBookingPayload();
        newBooking.setRoomId(testRoom.getRoomId());
        newBooking.setStartTime("2022-08-08T13:00:00Z");
        newBooking.setEndTime("2022-08-08T14:00:00Z");

        var response = given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .body(newBooking)
                .when().post("/api/users/{userId}/bookings", testUser.getUserId())
                .then()
                .assertThat()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

}
