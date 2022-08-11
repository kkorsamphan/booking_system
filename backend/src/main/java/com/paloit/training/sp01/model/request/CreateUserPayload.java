package com.paloit.training.sp01.model.request;

import lombok.Data;

@Data
public class CreateUserPayload {
    private String email;
    private String password;

    private String firstName;
    private String lastName;
}
