package com.paloit.training.sp01.controller;

import com.paloit.training.sp01.model.User;
import com.paloit.training.sp01.model.request.CreateUserRequest;
import com.paloit.training.sp01.model.request.UserLoginRequest;
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

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.assertEquals;

@Slf4j
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class AuthControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    UserRepository userRepo;

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
    }

    @AfterEach
    public void afterEach() {
        userRepo.deleteAll();
    }

    @Test
    public void loginUser_ReturnedSuccessfully_200() {
        UserLoginRequest payload = new UserLoginRequest();
        payload.setEmail("xxx@example.com");
        payload.setPassword("password");

        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .body(payload)
                .when()
                .post("/api/login")
                .then()
                .statusCode(HttpStatus.OK.value());
    }

    @Test
    public void loginUser_UserNotExists_ReturnedSuccessfully_401() {
        UserLoginRequest payload = new UserLoginRequest();
        payload.setEmail("newuser@example.com");
        payload.setPassword("password");

        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .body(payload)
                .when()
                .post("/api/login")
                .then()
                .statusCode(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    public void loginUser_IncorrectPassword_ReturnedSuccessfully_401() {
        UserLoginRequest payload = new UserLoginRequest();
        payload.setEmail("xxx@example.com");
        payload.setPassword("not_password");

        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .body(payload)
                .when()
                .post("/api/login")
                .then()
                .statusCode(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    public void createUser_ReturnedSuccessfully_200() {
        CreateUserRequest newUser = new CreateUserRequest();
        newUser.setFirstName("Kunlanit");
        newUser.setLastName("Korsamphan");
        newUser.setEmail("iamoyua@gmail.com");
        newUser.setPassword("password");

        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .body(newUser)
                .when()
                .post("/api/signup")
                .then()
                .statusCode(HttpStatus.OK.value());

        var userCount = userRepo.count();
        assertEquals(2, userCount);
    }

    @Test
    public void createUser_EmailExists_ReturnedSuccessfully_400() {
        CreateUserRequest newUser = new CreateUserRequest();
        newUser.setFirstName("Jane");
        newUser.setLastName("Doe");
        newUser.setEmail("xxx@example.com");
        newUser.setPassword("password");

        given().log().all()
                .with()
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .body(newUser)
                .when()
                .post("/api/signup")
                .then()
                .assertThat()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }
}
