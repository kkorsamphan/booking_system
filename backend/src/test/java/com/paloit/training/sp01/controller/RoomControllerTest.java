package com.paloit.training.sp01.controller;

import com.paloit.training.sp01.model.Booking;
import com.paloit.training.sp01.model.Room;
import com.paloit.training.sp01.model.User;
import com.paloit.training.sp01.model.request.CreateRoomPayload;
import com.paloit.training.sp01.model.request.CreateUserPayload;
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
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@Slf4j
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class RoomControllerTest {
    @LocalServerPort
    private int port;

    @Autowired
    RoomRepository roomRepo;

    @Autowired
    UserRepository userRepo;

    @Autowired
    BookingRepository bookingRepo;

    private Room testRoom1;
    private Room testRoom2;
    private Room testRoom3;
    private User testUser;
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

        Room room1 = new Room();
        room1.setSize(5);
        testRoom1 = roomRepo.save(room1);

        Room room2 = new Room();
        room2.setSize(15);
        testRoom2 = roomRepo.save(room2);

        Room room3 = new Room();
        room3.setSize(20);
        testRoom3 = roomRepo.save(room3);

        Booking booking = new Booking();
        booking.setUser(testUser);
        booking.setRoom(testRoom1);
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
    public void getAvailableRooms_ReturnedSuccessfully_200() {
        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .param("roomSize",6)
                .param("startTime", "2022-08-08T16:00:00Z")
                .param("endTime", "2022-08-08T17:00:00Z")
                .when().get("/api/rooms")
                .then()
                .statusCode(HttpStatus.OK.value())
                .and()
                .body("$", hasSize(2))
                .body("size", hasItems(15, 20));
    }

    @Test
    public void createRoom_ReturnedSuccessfully_200() {
        CreateRoomPayload newRoom  = new CreateRoomPayload();
        newRoom.setSize(10);

        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .body(newRoom)
                .when().post("/api/rooms")
                .then()
                .statusCode(HttpStatus.OK.value());

        var roomCount = roomRepo.count();
        assertEquals(4, roomCount);
    }

    @Test
    public void getRoomBookingsById_RoomExists_ReturnedSuccessfully_200() {
        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .when().get("api/rooms/{roomId}/bookings", testRoom1.getRoomId())
                .then()
                .statusCode(HttpStatus.OK.value())
                .and()
                .body("$", hasSize(1))
                .body("[0].bookingId", equalTo(testBooking.getBookingId().toString()))
                .body("[0].startTime", equalTo(testBooking.getStartTime().toString()))
                .body("[0].endTime", equalTo(testBooking.getEndTime().toString()));
    }

    @Test
    public void getRoomBookingsById_RoomNotExists_ReturnedSuccessfully_404() {
        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .when().get("/api/rooms/{roomId}/bookings", UUID.randomUUID())
                .then()
                .assertThat()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }
}
