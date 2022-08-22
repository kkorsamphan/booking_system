package com.paloit.training.sp01.controller;

import com.paloit.training.sp01.exception.NotAuthorizedException;
import com.paloit.training.sp01.exception.UserAlreadyExistsException;
import com.paloit.training.sp01.model.User;
import com.paloit.training.sp01.model.request.CreateUserRequest;
import com.paloit.training.sp01.model.request.UserLoginRequest;
import com.paloit.training.sp01.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class AuthController {

    private final AuthService authService;

    public AuthController(
            AuthService authService
    ) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody UserLoginRequest request) {
        try {
            User loggedInUser = authService.login(request);
            return ResponseEntity.ok(loggedInUser);
        }
        catch (NotAuthorizedException exc) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "Email or password is incorrect", exc);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<User> createUser(@RequestBody CreateUserRequest request) {
        try {
            User newUser = authService.signup(request);
            return ResponseEntity.ok(newUser);
        }
        catch (UserAlreadyExistsException exc) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "This email has been used.", exc);
        }
    }
}
