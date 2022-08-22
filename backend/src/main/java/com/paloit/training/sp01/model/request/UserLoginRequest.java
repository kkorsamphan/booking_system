package com.paloit.training.sp01.model.request;

import lombok.Data;

@Data
public class UserLoginRequest {
    private String email;
    private String password;
}
