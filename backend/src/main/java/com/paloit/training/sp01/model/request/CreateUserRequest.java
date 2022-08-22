package com.paloit.training.sp01.model.request;

import lombok.Data;

@Data
public class CreateUserRequest {
    private String email;
    private String password;

    private String firstName;
    private String lastName;
}
