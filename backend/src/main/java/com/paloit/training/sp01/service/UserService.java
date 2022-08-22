package com.paloit.training.sp01.service;

import com.paloit.training.sp01.exception.UserNotFoundException;
import com.paloit.training.sp01.model.Booking;
import com.paloit.training.sp01.model.User;
import com.paloit.training.sp01.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserById(UUID userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> {
                    throw new UserNotFoundException("User not found.");
                });
    }

    public ArrayList<Booking> getUserBookings(UUID userId) {

        User user =  userRepository.findById(userId)
                .orElseThrow(() -> {
                    throw new UserNotFoundException("User not found.");
                });

        return new ArrayList<>(user.getBookings());
    }
}
