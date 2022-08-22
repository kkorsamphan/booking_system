package com.paloit.training.sp01.service;

import com.paloit.training.sp01.exception.NotAuthorizedException;
import com.paloit.training.sp01.exception.UserAlreadyExistsException;
import com.paloit.training.sp01.model.User;
import com.paloit.training.sp01.model.request.CreateUserRequest;
import com.paloit.training.sp01.model.request.UserLoginRequest;
import com.paloit.training.sp01.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User login(UserLoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> {
                    throw new NotAuthorizedException("User not found.");
                });

        boolean validateLogin = user.getPassword().equals(request.getPassword());
        if (!validateLogin) {
            throw new NotAuthorizedException("Password is incorrect.");
        }

        return user;
    }

    public User signup(CreateUserRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isPresent()) {
            throw new UserAlreadyExistsException("This email has been used.");
        }

        User newUser = new User();
        newUser.setEmail(request.getEmail());
        newUser.setPassword(request.getPassword());
        newUser.setFirstName(request.getFirstName());
        newUser.setLastName(request.getLastName());

        userRepository.save(newUser);

        return newUser;
    }
}
